/**
 * Airtable Field Mapping Configuration
 * Maps Airtable column names to application field names
 */
const AIRTABLE_FIELD_MAPPING = {
  "Prénoms et noms des locataires": "tenantName",
  "Adresse complète": "tenantAddress",
  Emails: "tenantEmail",
  "Adresse du bailleur": "rentingAddress",
  "Loyers HC": "rentingAmount",
  Charges: "rentingChargeAmount",
  Bailleur: "senderName",
  "Banque de réception du virement": "bank",
  "Jour de paiement": "dayOfPayment",
  "Montant des aides": "cafAmount",
  "Demande de réception de quittance": "shouldSendTenantReceipt",
};

// List of required fields that must be present in every Airtable record
const REQUIRED_FIELDS = [
  "tenantName",
  "tenantAddress",
  "tenantEmail",
  "rentingAddress",
  "rentingAmount",
  "rentingChargeAmount",
  "senderName",
  "bank",
  "dayOfPayment",
];

// List of optional fields
const OPTIONAL_FIELDS = ["cafAmount", "shouldSendTenantReceipt"];
