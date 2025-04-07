function notificationHandlerFactory(message) {
  const emailSender = parseEmail(message.getFrom());
  if (emailSender === "Services.ccm@ca-norddefrance.fr") {
    return creditAgricoleNotificationHandler();
  } else if (emailSender === "nepasrepondre@bcom.nord.banquepopulaire.fr") {
    return banquePopulaireNotificationHandler();
  }

  return creditAgricoleNotificationHandler();
}
