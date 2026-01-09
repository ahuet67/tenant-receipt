function banquePopulaireNotificationHandler() {
  function messageIncludesTenantInfoPayment(message, tenantInfo) {
    const body = message.getBody();

    // Parse message format: "+X&#160;&euro;"
    // Handle HTML entity &#160; (non-breaking space)
    const amountRegex = /\+(\d+(?:,\d+)?)(?:&#160;|\s)*&euro;/i;
    const match = body.match(amountRegex);

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
