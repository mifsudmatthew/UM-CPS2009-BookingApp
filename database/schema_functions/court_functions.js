const courts_schema = require("../schemas/courts_schema");

/** ===================================== Retrieve Court =================================
 * ------------ 
 */

async function retrieveCourt(courtID) {
    try {
        // -------------------- Run Query
        const courts_found =  await courts_schema.findByID(courtID);

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
        throw new Error("Failed to Connect to Database");
    }
}

/** ===================================== Register Court =================================
 * ------------ 
 */
async function registerCourt({price_new, address_new, longitude_new, latitude_new}){
    try {
        // Construct Schema
        const newCourt = new courts_schema({    price       : price_new,
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

/** ===================================== Exporting ======================================================
 * ------------ Exportation of functions
 * Export the functions
 * Can rename them
 */


module.exports = {
    retrieveCourt       : retrieveCourt,
    registerCourt       : registerCourt,
};