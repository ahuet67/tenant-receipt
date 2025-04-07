function parseEmail(fromValue) {
  if (fromValue.includes("<")) {
    return fromValue.split("<")[1].split(">")[0];
  }
  return fromValue;
}

function getPaymentMessage(tenantInfo) {
  const inboxThreads = GmailApp.getInboxThreads();
  const totalThreads = [...inboxThreads];

  let i = 0;
  let message = undefined;
  while (i < totalThreads.length && !message) {
    const toTestThread = totalThreads[i];
    const sender = parseEmail(toTestThread.getMessages()[0].getFrom());
    if (sender === tenantInfo.bankAlertEmail) {
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
