function notificationHandlerFactory(message) {
  if (message.getFrom().includes("Services.ccm@ca-norddefrance.fr")) {
    return creditAgricoleNotificationHandler();
  } else if (
    message.getFrom().includes("nepasrepondre@bcom.nord.banquepopulaire.fr")
  ) {
    return banquePopulaireNotificationHandler();
  }

  return creditAgricoleNotificationHandler();
}
