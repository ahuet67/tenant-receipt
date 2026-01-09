function notificationHandlerFactory(bankId) {
  switch (bankId) {
    case BANK_CIC:
      return CICNotificationHandler();
    case BANK_BANQUE_POPULAIRE:
      return banquePopulaireNotificationHandler();
    case BANK_CREDIT_AGRICOLE:
      return creditAgricoleNotificationHandler();
  }

  return creditAgricoleNotificationHandler();
}
