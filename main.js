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
  const tenantInfos = await fetchTenantData();
  for (const tenantInfo of tenantInfos) {
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
        `Le locataire ${tenantInfo.tenantNames} n'est pas censé avoir payé pour le mois de ${COMMON_INFOS.month}`,
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
          ADMIN_EMAIL,
          `paiement non reçu de ${tenantInfo.tenantNames}`,
          `${tenantInfo.tenantNames} n'a pas effectué le paiement du mois de ${COMMON_INFOS.month}`,
        );
        errorOccured = true;
      }
    } catch (e) {
      sendEmail(
        ADMIN_EMAIL,
        `Erreur pour ${tenantInfo.tenantNames}`,
        `Une erreur est survenue pour ${tenantInfo.tenantNames}: ${e}`,
      );
      errorOccured = true;
    }
  }

  if (!errorOccured) {
    sendEmail(
      ADMIN_EMAIL,
      `Tous les loyers ont été reçu`,
      `Tous les loyers ont été reçu pour le mois de ${COMMON_INFOS.month}`,
    );
  }
}
