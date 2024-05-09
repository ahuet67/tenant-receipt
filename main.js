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

const TENANT_INFOS = [
  {
    tenantName: "Laverie N.A.M.Y",
    tenantAddress: "4 rue des Hortensias, 62220 Carvin",
    rentingAmount: 500,
    rentingAmountAsText: "cinq cent",
    rentingChargeAmount: 65,
    tenantEmail: "huet.alexandre@gmail.com",
    rentingAddress: "20 rue salvador allende, 62220 Carvin",
    totalRentingAmount: 500 + 65,
    paymentDate: moment(
      new Date(TODAY.getFullYear(), TODAY.getMonth(), 6)
    ).format("DD/MM/YYYY"),
    startRentingPeriod: moment(
      new Date(TODAY.getFullYear(), TODAY.getMonth(), 4)
    ).format("DD/MM/YYYY"),
    endRentingPeriod: moment(new Date(TODAY.getFullYear(), TODAY.getMonth(), 4))
      .add(1, "months")
      .format("DD/MM/YYYY"),
  },
];

function main() {
  for (const tenantInfo of TENANT_INFOS) {
    const receiptFile = generateReceipt(tenantInfo);
    sendReceipt(receiptFile, tenantInfo.tenantEmail);
  }
}
