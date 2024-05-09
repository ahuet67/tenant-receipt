function sendReceipt(receipt, tenantEmail) {
  const preparedEmail = GmailApp.getDraft(DRAFT_ID);
  const body = preparedEmail.getMessage().getBody();

  const attachmentsMail = [receipt.getAs(MimeType.PDF)];

  GmailApp.sendEmail(tenantEmail, DRAFT_SUBJECT, "", {
    attachments: attachmentsMail,
    htmlBody: body,
  });
}

function getDraftId() {
  var drafts = GmailApp.getDrafts();
  for (var draft of drafts) {
    const draftId = draft.getId();
    if (draft.getMessage().getSubject() === DRAFT_SUBJECT) {
      const draftId = draft.getId();
      Logger.log("draftId " + draftId);
    }
  }
}
