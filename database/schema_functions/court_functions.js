const courts_schema = require("../schemas/courts_schema");

/** ===================================== Retrieve Court =================================
 * ------------ Retrieve Court
 * Retrieves a court given a courtID
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

/** ===================================== Register Court =================================
 * ------------ Register a Court
 * Registers a new court
 * Does not check if court is already created.
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
    throw new Error("Failed to Connect to Database");
  }
}

/** ===================================== Get All Courts ======================================================
 * ------------ Get all of the courts
 * Gets a list of all courts in the database
 */
async function getAllCourts() {
  try {
    // Find all courts
    const allCourts = await courts_schema.find({});
    return { result: true, data: allCourts, error: null };
  } catch (error_message) {
    throw new Error("Failed to Connect to Database");
  }
}

async function updateCourt(court_id, newName, newPrice) {
  try {
    const court = await court_schema.findByIdAndUpdate(
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
      data: { court },
      error: null,
    };
  } catch (error_message) {
    throw new Error(`Failed to Connect to Database: ${error_message}`);
  }
}

/** ===================================== Exporting ======================================================
 * ------------ Exportation of functions
 * Export the functions
 * Can rename them
 */

module.exports = {
  retrieveCourt: retrieveCourt,
  registerCourt: registerCourt,
  getAllCourts: getAllCourts,
};
