const TENANT_INFOS = [
  {
    id: 999,
    tenantName: "TO_REPLACE",
    tenantAddress: "TO_REPLACE",
    senderName: "TO_REPLACE",
    rentingAmount: 500,
    rentingChargeAmount: 65,
    tenantEmail: "TO_REPLACE",
    rentingAddress: "TO_REPLACE",
    totalRentingAmount: 500 + 65,
    totalRentingAmountAsText: "sept cent",
    startRentingPeriod: moment(
      new Date(TODAY.getFullYear(), TODAY.getMonth(), 4)
    ).format("DD/MM/YYYY"),
    endRentingPeriod: moment(new Date(TODAY.getFullYear(), TODAY.getMonth(), 4))
      .add(1, "months")
      .format("DD/MM/YYYY"),
    bankAlertEmail: "TO_REPLACE",
    alertMessageId: "TO_REPLACE",
    shouldSendTenantReceipt: true,
    cafAmount: undefined,
  },
];
