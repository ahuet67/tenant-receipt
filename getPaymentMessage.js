function getPaymentMessage(tenantInfo) {
  const inboxThreads = GmailApp.getInboxThreads();
  const totalThreads = [...inboxThreads];

  let i = 0;
  let message = undefined;
  while (i < totalThreads.length && !message) {
    const toTestThread = totalThreads[i];
    const fisrtMessage = toTestThread.getMessages()[0];
    if (fisrtMessage.getFrom().includes(tenantInfo.bankAlertEmail)) {
      const messages = toTestThread.getMessages();
      const notificationHandler = notificationHandlerFactory(messages[0]);
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
