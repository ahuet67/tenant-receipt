/**
 * Serve the HTML UI for tenant selection
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile("commandsView").setTitle(
    "Gestion des Quittances",
  );
}

/**
 * Load tenants from Airtable
 * @returns {Array} Array of tenant objects with id and tenantName
 */
async function loadTenants() {
  try {
    const tenants = await fetchTenantData();
    return tenants.map((tenant) => ({
      id: tenant.id,
      tenantName: tenant.tenantName,
    }));
  } catch (error) {
    console.error(`Error loading tenants: ${error}`);
    throw new Error(`Impossible de charger les locataires: ${error.message}`);
  }
}

/**
 * Génère une quittance de loyer pour le locataire sélectionné
 * Utilise la date actuelle comme date de paiement
 * @param {string} tenantId - ID du locataire
 * @returns {Object} File object representing the generated receipt
 */
async function generateReceiptCommand(tenantId) {
  if (!tenantId) {
    throw new Error("ID de locataire requis");
  }

  const tenants = await fetchTenantData();
  const selectedTenant = tenants.find((tenant) => tenant.id === tenantId);

  if (!selectedTenant) {
    throw new Error(`Aucun locataire trouvé avec l'ID ${tenantId}`);
  }

  const paymentDate = moment(TODAY).format("DD/MM/YYYY");
  console.log(
    `Génération d'une quittance pour ${selectedTenant.tenantName} avec la date de paiement: ${paymentDate}`,
  );

  try {
    const receiptFile = generateReceipt(selectedTenant, paymentDate);
    console.log(
      `Quittance générée avec succès pour ${selectedTenant.tenantName}`,
    );
    return receiptFile;
  } catch (error) {
    console.error(`Erreur lors de la génération de la quittance: ${error}`);
    throw new Error(
      `Erreur lors de la génération de la quittance: ${error.message}`,
    );
  }
}

/**
 * Génère un avis de loyer impayé pour le locataire sélectionné
 * Utilise la date de fin de la période de location comme date de paiement demandée
 * @param {string} tenantId - ID du locataire
 * @returns {Object} File object representing the generated unpaid rent notice
 */
async function generateUnpaidRentCommand(tenantId) {
  if (!tenantId) {
    throw new Error("ID de locataire requis");
  }

  const tenants = await fetchTenantData();
  const selectedTenant = tenants.find((tenant) => tenant.id === tenantId);

  if (!selectedTenant) {
    throw new Error(`Aucun locataire trouvé avec l'ID ${tenantId}`);
  }

  console.log(
    `Génération d'un avis de loyer impayé pour ${selectedTenant.tenantName}`,
  );

  try {
    const unpaidRentFile = generateUnpaidRent(selectedTenant);
    console.log(
      `Avis de loyer impayé généré avec succès pour ${selectedTenant.tenantName}`,
    );
    return unpaidRentFile;
  } catch (error) {
    console.error(
      `Erreur lors de la génération de l'avis de loyer impayé: ${error}`,
    );
    throw new Error(
      `Erreur lors de la génération de l'avis de loyer impayé: ${error.message}`,
    );
  }
}
