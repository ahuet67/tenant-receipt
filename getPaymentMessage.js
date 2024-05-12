function messageIncludesTenantInfoPayment(message, alertMessageId) {
  const attachmentContent = message.getAttachments()[0].getDataAsString();
  return attachmentContent.includes(alertMessageId);
}

function getPaymentMessage(tenantInfo) {
  const trashedThreads = GmailApp.getTrashThreads();
  const inboxThreads = GmailApp.getInboxThreads();
  const totalThreads = [...inboxThreads, ...trashedThreads];

  let i = 0;
  let message = undefined;
  while (i < totalThreads.length && !message) {
    const toTestThread = totalThreads[i];
    const sender = toTestThread.getMessages()[0].getFrom();
    if (sender === tenantInfo.bankAlertEmail) {
      for (const messageItem of toTestThread.getMessages()) {
        if (
          messageIncludesTenantInfoPayment(
            messageItem,
            tenantInfo.alertMessageId
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
