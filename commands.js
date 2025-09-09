const USER_ID_SELECTED = 1;

/**
 * Génère une quittance de loyer pour le locataire sélectionné
 * Utilise la date actuelle comme date de paiement
 */
function generateReceiptCommand() {
  const selectedTenant = TENANT_INFOS.find(
    (tenant) => tenant.id === USER_ID_SELECTED
  );

  if (!selectedTenant) {
    console.log(`Aucun locataire trouvé avec l'ID ${USER_ID_SELECTED}`);
    return;
  }

  const paymentDate = moment(TODAY).format("DD/MM/YYYY");
  console.log(
    `Génération d'une quittance pour ${selectedTenant.tenantName} avec la date de paiement: ${paymentDate}`
  );

  try {
    const receiptFile = generateReceipt(selectedTenant, paymentDate);
    console.log(
      `Quittance générée avec succès pour ${selectedTenant.tenantName}`
    );
    return receiptFile;
  } catch (error) {
    console.log(`Erreur lors de la génération de la quittance: ${error}`);
    throw error;
  }
}

/**
 * Génère un avis de loyer impayé pour le locataire sélectionné
 * Utilise la date de fin de la période de location comme date de paiement demandée
 */
function generateUnpaidRentCommand() {
  const selectedTenant = TENANT_INFOS.find(
    (tenant) => tenant.id === USER_ID_SELECTED
  );

  if (!selectedTenant) {
    console.log(`Aucun locataire trouvé avec l'ID ${USER_ID_SELECTED}`);
    return;
  }
  console.log(
    `Génération d'un avis de loyer impayé pour ${selectedTenant.tenantName}`
  );

  try {
    const unpaidRentFile = generateUnpaidRent(selectedTenant);
    console.log(
      `Avis de loyer impayé généré avec succès pour ${selectedTenant.tenantName}`
    );
    return unpaidRentFile;
  } catch (error) {
    console.log(
      `Erreur lors de la génération de l'avis de loyer impayé: ${error}`
    );
    throw error;
  }
}
