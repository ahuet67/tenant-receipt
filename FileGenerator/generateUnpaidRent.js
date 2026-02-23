// return a DocumentApp object with the template filled in with tenantInfo
function generateUnpaidRent(tenantInfo) {
  const file = DriveApp.getFileById(
    tenantInfo.cafAmount ? UNPAID_CAF_RENT_FILE_ID : UNPAID_RENT_FILE_ID,
  );
  const copyFile = file.makeCopy();
  const copyFileId = copyFile.getId();
  const finalFile = DocumentApp.openById(copyFileId);
  finalFile.setName(
    `loyer_impayé_${tenantInfo.tenantNames}_${COMMON_INFOS.month}`,
  );

  const body = finalFile.getBody();
  const requestedPaymentDate = moment(TODAY)
    .add(8, "days")
    .format("DD/MM/YYYY");
  interpolateTemplate(body, tenantInfo, { requestedPaymentDate });

  finalFile.saveAndClose();
  copyFile.moveTo(DriveApp.getFolderById(SHARED_FOLDER_ID));
  return finalFile;
}
