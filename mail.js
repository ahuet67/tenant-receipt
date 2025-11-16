const sendEmail = DEBUG ? console.log : GmailApp.sendEmail;

function sendReceipt(receipt, tenantEmail) {
  const preparedEmail = GmailApp.getDraft(DRAFT_ID);
  const body = preparedEmail.getMessage().getBody();

  const attachmentsMail = [receipt.getAs(MimeType.PDF)];

  sendEmail(tenantEmail, DRAFT_SUBJECT, "", {
    attachments: attachmentsMail,
    htmlBody: body,
    cc: ADMIN_EMAIL,
  });
}

function getDraftId() {
  var drafts = GmailApp.getDrafts();
  for (var draft of drafts) {
    if (draft.getMessage().getSubject() === DRAFT_SUBJECT) {
      Logger.log("draftId " + draft.getId());
    }
  }
}
