const courts_schema = require("../schemas/courts_schema");

/** ===================================== Retrieve Court =================================
 * ------------ Retrieve Court
 * Retrieves a court given a courtID
 */

async function retrieveCourt(courtID) {
    try {
        // -------------------- Run Query
        const courts_found =  await courts_schema.findById(courtID);

        // -------------------- Validation
        if (courts_found == null) {
            return { result : false,
                     data   : null,
                     error  : "No courts found matching the ID: " + courtID
                   };
        }
        
        // -------------------- Succesfully returnig the found user
        return { result: true, data: courts_found, error: null };

    } catch (error_message) {
        throw new Error("Failed to Connect to Database: "+error_message);
    }
}

/** ===================================== Register Court =================================
 * ------------ Register a Court
 * Registers a new court
 * Does not check if court is already created.
 */
async function registerCourt({name_new, price_new, address_new, longitude_new, latitude_new}){
    try {
        // Construct Schema
        const newCourt = new courts_schema({    court_name  : name_new,
                                                price       : price_new,
                                                address     : address_new, 
                                                longitude   : longitude_new,
                                                latitude    : latitude_new
                                            });
        // Save the new user
        return {result: true, data: await newCourt.save(), error: null};

    }catch (error_message) {
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
        const allCourts = await court_schema.find({});
        return { result: true, data: allCourts, error: null };
    } catch (error_message) {
        throw new Error("Failed to Connect to Database");
    }
}

/** ===================================== Exporting ======================================================
 * ------------ Exportation of functions
 * Export the functions
 * Can rename them
 */


module.exports = {
    retrieveCourt       : retrieveCourt,
    registerCourt       : registerCourt,
    getAllCourts        : getAllCourts
};