function getPaymentMessage(tenantInfo) {
  const inboxThreads = GmailApp.getInboxThreads();
  const totalThreads = [...inboxThreads];
  const bankConfig = BANK_CONFIGS[tenantInfo.bank];

  let i = 0;
  let message = undefined;
  while (i < totalThreads.length && !message) {
    const toTestThread = totalThreads[i];
    const messages = toTestThread.getMessages();
    const fisrtMessage = messages[0];
    if (fisrtMessage.getFrom().includes(bankConfig.notificationEmail)) {
      const notificationHandler = notificationHandlerFactory(tenantInfo.bank);
      for (const messageItem of messages) {
        if (
          notificationHandler.messageIncludesTenantInfoPayment(
            messageItem,
            tenantInfo
          ) &&
          messageItem.getDate().getMonth() === TODAY.getMonth()
        ) {
          message = messageItem;
        }
      }
    }

    i++;
  }

  return message;
}
