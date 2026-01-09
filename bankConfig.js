// Bank identifiers
const BANK_CIC = "cic";
const BANK_BANQUE_POPULAIRE = "banquePopulaire";
const BANK_CREDIT_AGRICOLE = "creditAgricole";

// Bank configuration
const BANK_CONFIGS = {
  [BANK_CIC]: {
    id: BANK_CIC,
    name: "CIC",
    notificationEmail: "noreply@cic.fr",
  },
  [BANK_BANQUE_POPULAIRE]: {
    id: BANK_BANQUE_POPULAIRE,
    name: "Banque Populaire",
    notificationEmail: "nepasrepondre@notification.nord.banquepopulaire.fr",
  },
  [BANK_CREDIT_AGRICOLE]: {
    id: BANK_CREDIT_AGRICOLE,
    name: "Crédit Agricole",
    notificationEmail: "Services.ccm@ca-norddefrance.fr",
  },
};
