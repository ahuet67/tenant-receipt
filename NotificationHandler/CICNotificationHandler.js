function CICNotificationHandler() {
  function messageIncludesTenantInfoPayment(message, tenantInfo) {
    const body = message.getBody();
    return body.includes(tenantInfo.alertMessageId);
  }

  return {
    messageIncludesTenantInfoPayment,
  };
}
