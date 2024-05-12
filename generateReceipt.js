function interpolateTemplate(body, tenantInfo, paymentDate) {
  for (const [key, value] of Object.entries(tenantInfo)) {
    body.replaceText(`{{${key}}}`, value);
  }
  for (const [key, value] of Object.entries(COMMON_INFOS)) {
    body.replaceText(`{{${key}}}`, value);
  }

  body.replaceText(`{{paymentDate}}`, paymentDate);
}

function generateReceipt(tenantInfo, paymentDate) {
  const tenantReceiptFile = DriveApp.getFileById(TENANT_RECEIPT_FILE_ID);
  const copyTenantReceiptFile = tenantReceiptFile.makeCopy();
  const copyTenantReceiptFileId = copyTenantReceiptFile.getId();
  const finalTenantReceiptFile = DocumentApp.openById(copyTenantReceiptFileId);
  finalTenantReceiptFile.setName(
    `quittance_loyer_${tenantInfo.tenantName}_${COMMON_INFOS.month}`
  );

  const body = finalTenantReceiptFile.getBody();
  interpolateTemplate(body, tenantInfo, paymentDate);

  finalTenantReceiptFile.saveAndClose();
  const finalTenantReceiptFileAsPDF = finalTenantReceiptFile.getAs(
    MimeType.PDF
  );
  copyTenantReceiptFile.setTrashed(true);
  return finalTenantReceiptFileAsPDF;
}
