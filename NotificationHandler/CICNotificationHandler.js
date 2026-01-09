function CICNotificationHandler() {
  function messageIncludesTenantInfoPayment(message, tenantInfo) {
    const body = message.getBody();

    // Parse message format: "Opération créditrice supérieure à <b>X EUR</b> : +Y EUR"
    // We need to extract Y (the actual amount) and compare with tenantInfo.totalRentingAmount
    const amountRegex =
      /Opération créditrice supérieure à <b>[\d,]+\s+EUR<\/b>\s*:\s*\+([\d.]+)\s+EUR/i;
    const match = body.match(amountRegex);

    if (!match) {
      return false;
    }

    // Extract amount and convert to number (CIC uses dot as decimal separator in actual amount)
    const extractedAmount = parseFloat(match[1]);

    // Compare with expected amount
    return Math.abs(extractedAmount - tenantInfo.totalRentingAmount) < 0.01;
  }

  return {
    messageIncludesTenantInfoPayment,
  };
}
