/**
 * Airtable Adapter Module
 * Fetches tenant data from Airtable and transforms it to application schema
 */

/**
 * Main function to fetch tenant data from Airtable
 * Handles API integration, filtering, mapping, and transformation
 *
 * @returns {Promise<Array>} Array of tenant objects with computed fields
 * @throws {Error} Descriptive error if Airtable is unreachable or data is invalid
 */
async function fetchTenantData() {
  try {
    const airtableRecords = await fetchAirtableRecords();
    const activeRecords = filterActiveRecords(airtableRecords);
    const tenantDataArray = activeRecords.map((record) =>
      transformAirtableRecord(record),
    );

    console.log(
      `Successfully fetched and transformed ${tenantDataArray.length} active tenant(s) from Airtable`,
    );

    return tenantDataArray;
  } catch (error) {
    const errorMessage = `Airtable adapter error: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Fetch records from Airtable API
 * Uses Google Apps Script's UrlFetchApp for HTTP requests
 *
 * @returns {Promise<Array>} Raw Airtable records
 * @throws {Error} If API request fails or authentication fails
 */
async function fetchAirtableRecords() {
  try {
    const baseId = AIRTABLE_BASE_ID;

    // Fetch all records from the Bail table
    const tableUrl = `https://api.airtable.com/v0/${baseId}/${AIRTABLE_TABLE_ID}`;
    const allRecords = [];
    let offset = null;

    do {
      const url = offset ? `${tableUrl}?offset=${offset}` : tableUrl;
      const response = await makeAirtableRequest(url);
      const data = JSON.parse(response);

      allRecords.push(...data.records);
      offset = data.offset;
    } while (offset);

    return allRecords;
  } catch (error) {
    throw new Error(
      `Failed to fetch Airtable records: ${error.message}. Ensure AIRTABLE_API_KEY is valid and Airtable is accessible.`,
    );
  }
}

/**
 * Make authenticated HTTP request to Airtable API
 *
 * @param {string} url - Airtable API URL
 * @returns {Promise<string>} Response body as string
 * @throws {Error} If request fails
 */
async function makeAirtableRequest(url) {
  try {
    const options = {
      method: "get",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      muteHttpExceptions: false,
    };

    const response = UrlFetchApp.fetch(url, options);
    return response.getContentText();
  } catch (error) {
    throw new Error(
      `HTTP request to Airtable failed: ${error.message}. Check network connectivity and API key.`,
    );
  }
}

/**
 * Filter records to include only those with Statut === "Actif"
 *
 * @param {Array} records - Raw Airtable records
 * @returns {Array} Filtered records with only active statuses
 */
function filterActiveRecords(records) {
  const activeRecords = records.filter((record) => {
    const statut = record.fields["Statut"];
    return statut === "Actif";
  });

  console.log(
    `Filtered ${activeRecords.length} active record(s) from ${records.length} total record(s)`,
  );

  return activeRecords;
}

/**
 * Transform a single Airtable record to application schema
 * Handles field mapping, validation, bank mapping, and date computation
 *
 * @param {Object} record - Raw Airtable record
 * @returns {Object} Transformed tenant object
 * @throws {Error} If required fields are missing or invalid
 */
function transformAirtableRecord(record) {
  const fields = record.fields;
  const transformedData = {};

  // Map Airtable fields to application fields
  try {
    // Validate and map required fields
    for (const [appFieldName] of Object.entries(AIRTABLE_FIELD_MAPPING)) {
      const applicationFieldName = AIRTABLE_FIELD_MAPPING[appFieldName];
      const value = fields[appFieldName];

      // Returned records do not include any fields with "empty" values, e.g. "", [], or false.

      // Check if it's a required field
      if (REQUIRED_FIELDS.includes(applicationFieldName)) {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "")
        ) {
          throw new Error(
            `Required field "${appFieldName}" (mapped to "${applicationFieldName}") is missing or empty in record ${record.id}`,
          );
        }
      }

      // Map optional fields
      if (OPTIONAL_FIELDS.includes(applicationFieldName) && value) {
        transformedData[applicationFieldName] = value;
      }

      // Map required fields
      if (REQUIRED_FIELDS.includes(applicationFieldName)) {
        transformedData[applicationFieldName] = value;
      }
    }

    // Handle bank name mapping
    const rawBankName = transformedData.bank;
    const mappedBankCode = BANK_NAME_MAPPING[rawBankName];

    if (!mappedBankCode) {
      throw new Error(
        `Bank name "${rawBankName}" not found in bank mapping for tenant "${
          transformedData.tenantName
        }". Available banks: ${Object.keys(BANK_NAME_MAPPING).join(", ")}`,
      );
    }

    transformedData.bank = mappedBankCode;

    // Compute date fields
    const paymentDay = parseInt(transformedData.paymentDay, 10);

    if (isNaN(paymentDay) || paymentDay < 1 || paymentDay > 31) {
      throw new Error(
        `Invalid payment day "${transformedData.paymentDay}" for tenant "${transformedData.tenantName}". Must be a number between 1 and 31.`,
      );
    }

    transformedData.id = record.id;

    transformedData.totalRentingAmount =
      transformedData.rentingAmount +
      transformedData.rentingChargeAmount -
      (transformedData.cafAmount || 0);

    console.log(
      `Successfully transformed tenant: ${JSON.stringify(transformedData)}`,
    );

    return transformedData;
  } catch (error) {
    throw new Error(`Error transforming record ${record.id}: ${error.message}`);
  }
}

/**
 * Validate that all field mappings are correct
 * (Helper function for debugging)
 *
 * @throws {Error} If mapping configuration is invalid
 */
function validateMappingConfiguration() {
  const missingRequiredFields = REQUIRED_FIELDS.filter(
    (field) => !Object.values(AIRTABLE_FIELD_MAPPING).includes(field),
  );

  if (missingRequiredFields.length > 0) {
    throw new Error(
      `Missing required fields in AIRTABLE_FIELD_MAPPING: ${missingRequiredFields.join(
        ", ",
      )}`,
    );
  }

  console.log("Field mapping configuration is valid");
}
