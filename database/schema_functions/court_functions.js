const courts_schema = require("../schemas/courts_schema");

/**
 * Retrieve a court by court ID.
 * @category Database
 * @param {string} courtID - The ID of the court to retrieve.
 * @returns {Object} An object containing the result, data, and error.
 */
async function retrieveCourt(courtID) {
  try {
    // -------------------- Run Query
    const courts_found = await courts_schema.findById(courtID);

    // -------------------- Validation
    if (courts_found == null) {
      return {
        result: false,
        data: null,
        error: "No courts found matching the ID: " + courtID,
      };
    }

    // -------------------- Succesfully returnig the found user
    return { result: true, data: courts_found, error: null };
  } catch (error_message) {
    throw new Error("Failed to Connect to Database: " + error_message);
  }
}

/**
 * Register a new court.
 * @category Database
 * @param {Object} courtDetails - Details of the court to register.
 * @returns {Object} An object containing the result, data, and error.
 */
async function registerCourt({
  name_new,
  price_new,
  address_new,
  longitude_new,
  latitude_new,
  area_new,
  type_new,
}) {
  try {
    // Construct Schema
    const newCourt = new courts_schema({
      court_name: name_new,
      price: price_new,
      address: address_new,
      longitude: longitude_new,
      latitude: latitude_new,
      area: area_new,
      type: type_new,
    });
    // Save the new user
    return { result: true, data: await newCourt.save(), error: null };
  } catch (error_message) {
    throw new Error("Failed to Connect to Database" + error_message);
  }
}

/**
 * Get all courts.
 * @category Database
 * @returns {Object} An object containing the result, data, and error.
 */
async function getAllCourts() {
  try {
    // Find all courts
    const allCourts = await courts_schema.find({});
    return { result: true, data: allCourts, error: null };
  } catch (error_message) {
    throw new Error("Failed to Connect to Database" + error_message);
  }
}

/**
 * Update court details.
 * @category Database
 * @param {string} court_id - The ID of the court to update.
 * @param {string} newName - The new name for the court.
 * @param {number} newPrice - The new price for the court.
 * @returns {Object} An object containing the result, data, and error.
 */
async function updateCourt(court_id, newName, newPrice) {
  try {
    const court = await courts_schema.findByIdAndUpdate(
      court_id, // Search by court_id
      { $set: { court_name: newName, price: newPrice } }, // Change name and price
      { new: true } // Specify to return updated entry
    );

    // --------------------- No court Found (Cannot reset password)
    if (court == null) {
      return {
        result: false,
        data: null,
        error: `No court found that matches that id: ${court_id}`,
      };
    }

    // --------------------- Court Found (returning stuff)
    return {
      result: true,
      data: court,
      error: null,
    };
  } catch (error_message) {
    throw new Error(`Failed to Connect to Database: ${error_message}`);
  }
}

/**
 * Exported functions for court management.
 */
module.exports = {
  retrieveCourt: retrieveCourt,
  registerCourt: registerCourt,
  getAllCourts: getAllCourts,
  updateCourt: updateCourt,
};
