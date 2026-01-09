function creditAgricoleNotificationHandler() {
  function messageIncludesTenantInfoPayment(message, tenantInfo) {
    const attachmentContent = message.getAttachments()[0].getDataAsString();

    // Parse attachment format: "VIREMENT EN VOTRE FAVEUR X EUR" or "VIREMENT EN VOTRE FAVEUR X,XX EUR"
    const amountRegex = /VIREMENT EN VOTRE FAVEUR\s+([\d,]+)\s+EUR/i;
    const match = attachmentContent.match(amountRegex);

    if (!match) {
      return false;
    }

    // Extract amount and convert to number (replace comma with dot for decimal)
    const extractedAmount = parseFloat(match[1].replace(",", "."));

    // Compare with expected amount
    return Math.abs(extractedAmount - tenantInfo.totalRentingAmount) < 0.01;
  }

  return {
    messageIncludesTenantInfoPayment,
  };
}
