function notificationHandlerFactory(message) {
  if (message.getFrom().includes("Services.ccm@ca-norddefrance.fr")) {
    return creditAgricoleNotificationHandler();
  } else if (
    message
      .getFrom()
      .includes("nepasrepondre@notification.nord.banquepopulaire.fr")
  ) {
    return banquePopulaireNotificationHandler();
  } else if (message.getFrom().includes("noreply@cic.fr")) {
    return CICNotificationHandler();
  }

  return creditAgricoleNotificationHandler();
}
