const stripe_schema = require("../schemas/stripe_schema");

/** ===================================== Retrieve Court =================================
 * ------------ 
 */
async function retrieveStripe(session_id) {
    try {
        // -------------------- Run Query
        stripe_found = await stripe_schema.findOne({sessionID : session_id});

        // -------------------- Validation
        if (stripe_found == null) {
            return { result : false,
                     data   : null,
                     error  : "No sessions found matching the ID: " + session_id
                   };
        }
        
        // -------------------- Succesfully returnig the found user
        return { result: true, data: stripe_found, error: null };

    } catch (error_message) {
        throw new Error("Failed to Connect to Database");
    }
}

/** ===================================== Register Court =================================
 * ------------ 
 */
async function registerStripe({session_id, email_new, amount_new}){
    try {

        stripe_found = await stripe_schema.findOne({sessionID : session_id});
        
        // ----------------------- validation of query
        if(stripe_found != null){ 
            return { result: false,
                     data:null, 
                     error: "sessions already in use"
                    };
        }
        // Construct Schema
        const newSession = new stripe_schema({sessionID   : session_id,
                                              email       : email_new,
                                              amount      : amount_new
                                             });
        // Save the new user
        return {result: true, data: await newSession.save(), error: null};

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
    registerStripe      : registerStripe,
    retrieveStripe      : retrieveStripe,
};