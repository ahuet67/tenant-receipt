const TENANT_INFOS = [
  {
    tenantName: "TO_REPLACE",
    tenantAddress: "TO_REPLACE",
    rentingAmount: 500,
    rentingAmountAsText: "TO_REPLACE",
    rentingChargeAmount: 65,
    tenantEmail: "TO_REPLACE",
    rentingAddress: "TO_REPLACE",
    totalRentingAmount: 500 + 65,
    startRentingPeriod: moment(
      new Date(TODAY.getFullYear(), TODAY.getMonth(), 4)
    ).format("DD/MM/YYYY"),
    endRentingPeriod: moment(new Date(TODAY.getFullYear(), TODAY.getMonth(), 4))
      .add(1, "months")
      .format("DD/MM/YYYY"),
    bankAlertEmail: "TO_REPLACE",
    alertMessageId: "TO_REPLACE",
    shouldSendTenantReceipt: true,
  },
];
