function interpolateTemplate(body, tenantInfo, otherInfos) {
  function getTemplateVariables(tenantInfo) {
    const startRentingPeriod = moment(
      new Date(TODAY.getFullYear(), TODAY.getMonth(), tenantInfo.paymentDay),
    );
    const endRentingPeriod = startRentingPeriod.add(1, "months");

    return {
      startRentingPeriod: startRentingPeriod.format("DD/MM/YYYY"),
      endRentingPeriod: endRentingPeriod.format("DD/MM/YYYY"),
      totalRentingAmountAsText: convertAmountToFrenchText(
        tenantInfo.totalRentingAmount,
      ),
    };
  }

  const templateVariables = {
    ...COMMON_INFOS,
    ...otherInfos,
    ...tenantInfo,
    ...getTemplateVariables(tenantInfo),
  };

  for (const [key, value] of Object.entries(templateVariables)) {
    body.replaceText(`{{${key}}}`, value);
  }
}
