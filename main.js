var momentLib = eval(
  UrlFetchApp.fetch(
    "https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js",
  ).getContentText(),
);
var localLib = eval(
  UrlFetchApp.fetch(
    "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/fr.js",
  ).getContentText(),
);

const TODAY = new Date();

const COMMON_INFOS = {
  date: moment(TODAY).format("DD/MM/YYYY"),
  month: moment(TODAY).format("MMMM"),
  year: TODAY.getFullYear(),
};

async function main() {
  let errorOccured = false;
  const otherAdminEmails = ADMIN_EMAILS.splice(1).join(",");
  const tenantInfos = await fetchTenantData();
  for (const tenantInfo of tenantInfos) {
    const tenantIdentification = `${tenantInfo.tenantNames} louant au ${tenantInfo.tenantAddress}`
    const isTenantShouldHavePaid = moment(TODAY).isAfter(
      moment(
        new Date(
          TODAY.getFullYear(),
          TODAY.getMonth(),
          parseInt(tenantInfo.paymentDay),
        ),
      ),
    );
    if (!isTenantShouldHavePaid) {
      console.log(
        `Le locataire ${tenantIdentification} n'est pas censé avoir payé pour le mois de ${COMMON_INFOS.month}`,
      );
      continue;
    }

    try {
      const paymentMessage = getPaymentMessage(tenantInfo);
      if (paymentMessage) {
        if (tenantInfo.shouldSendTenantReceipt && !paymentMessage.isStarred()) {
          const paymentDate = moment(paymentMessage.getDate()).format(
            "DD/MM/YYYY",
          );
          const receiptFile = generateReceipt(tenantInfo, paymentDate);
          sendReceipt(receiptFile, tenantInfo.tenantEmail);
          if (!DEBUG) {
            paymentMessage.star();
          }
        }
      } else {
        sendEmail(
          ADMIN_EMAILS[0],
          `paiement non reçu de ${tenantIdentification} sur la banque ${tenantInfo.bank}`,
          `${tenantIdentification} n'a pas effectué le paiement du mois de ${COMMON_INFOS.month}`,
          {
            cc: otherAdminEmails,
          },
        );
        errorOccured = true;
      }
    } catch (e) {
      sendEmail(
        ADMIN_EMAILS[0],
        `Erreur pour ${tenantIdentification}`,
        `Une erreur est survenue pour ${tenantIdentification}: ${e}`,
        {
          cc: otherAdminEmails,
        },
      );
      errorOccured = true;
    }
  }

  if (!errorOccured) {
    sendEmail(
      ADMIN_EMAILS[0],
      `Tous les loyers ont été reçu`,
      `Tous les loyers ont été reçu pour le mois de ${COMMON_INFOS.month}`,
      {
        cc: otherAdminEmails,
      },
    );
  }
}
