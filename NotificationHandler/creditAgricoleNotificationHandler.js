function creditAgricoleNotificationHandler() {
  function messageIncludesTenantInfoPayment(message, tenantInfo) {
    const attachmentContent = message.getAttachments()[0].getDataAsString();
    return attachmentContent.includes(tenantInfo.alertMessageId);
  }

  return {
    messageIncludesTenantInfoPayment,
  };
}
