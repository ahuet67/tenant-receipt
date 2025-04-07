function banquePopulaireNotificationHandler() {
  function messageIncludesTenantInfoPayment(message, tenantInfo) {
    const body = message.getBody();
    return body.includes(tenantInfo.totalRentingAmount);
  }

  return {
    messageIncludesTenantInfoPayment,
  };
}
