var momentLib = eval(
  UrlFetchApp.fetch(
    "https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js"
  ).getContentText()
);
var localLib = eval(
  UrlFetchApp.fetch(
    "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/fr.js"
  ).getContentText()
);

const TODAY = new Date();

const COMMON_INFOS = {
  date: moment(TODAY).format("DD/MM/YYYY"),
  month: moment(TODAY).format("MMMM"),
  year: TODAY.getFullYear(),
};

function main() {
  for (const tenantInfo of TENANT_INFOS) {
    try {
      const paymentMessage = getPaymentMessage(tenantInfo);
      if (paymentMessage) {
        const paymentDate = moment(paymentMessage.getDate()).format(
          "DD/MM/YYYY"
        );
        const receiptFile = generateReceipt(tenantInfo, paymentDate);
        sendReceipt(receiptFile, tenantInfo.tenantEmail);
      } else {
        GmailApp.sendEmail(
          ADMIN_EMAIL,
          `paiement non reçu de ${tenantInfo.tenantName}`,
          `${tenantInfo.tenantName} n'a pas effectué le paiement du mois de ${COMMON_INFOS.month}`
        );
      }
    } catch (e) {
      GmailApp.sendEmail(
        ADMIN_EMAIL,
        `Erreur pour ${tenantInfo.tenantName}`,
        `Une erreur est survenue pour ${tenantInfo.tenantName}: ${e}`
      );
    }
  }
}
