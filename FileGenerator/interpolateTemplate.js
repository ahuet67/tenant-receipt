function interpolateTemplate(body, tenantInfo, otherInfos) {
  for (const [key, value] of Object.entries(tenantInfo)) {
    body.replaceText(`{{${key}}}`, value);
  }
  for (const [key, value] of Object.entries(COMMON_INFOS)) {
    body.replaceText(`{{${key}}}`, value);
  }
  for (const [key, value] of Object.entries(otherInfos)) {
    body.replaceText(`{{${key}}}`, value);
  }
}
