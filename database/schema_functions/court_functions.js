const courts_schema = require("../schemas/courts_schema");

/** ===================================== Utility Functions =============================
 * ------------ Removes Mongoose Generated Stuff
 * This should remove some of the more unwanted/ un-needed fields that mongodb
 * Removes the "_id" and "__v" properties from the given document object.
 */

function removeIdAndV(document) {
    // ---------------- Validation
    if (document == null) { // Check if document is null or undefined
        return null;
    }

    // ---------------- Cleaning
    delete document._id; delete document.__v; return document;
}

/** ===================================== Retrieve User =================================
 * ------------ Retrieves a User given an email
 * Has validation for whether the query returns anything
 * It makes use of the findOne hence it will return an object and not an array
 */

async function retrieveUser(email_toSearch) {
    try {
        // -------------------- Run Query
        const user_found = removeIdAndV( await user_schema.findOne({ email: email_toSearch }));

        // -------------------- Validation
        if (user_found == null) {
            return { result : false,
                     data   : null,
                     error  : "No user found that matches the email: " + email_toSearch
                   };
        }
        
        // -------------------- Succesfully returnig the found user
        return { result: true, data: user_found, error: null };

    } catch (error_message) {
        return {result: false, data: null, error: error_message};
    }
}

/** ===================================== Register User =================================
 * ------------ Registers a new user
 * Has validation for whether the query returns anything
 * It makes use of the findOne hence it will return an object and not an array list 
 */
async function registerUser({email_new, password_new, name_new}){
    try {
        // ----------------------- Check if email is in use
        user_found = removeIdAndV( await user_schema.findOne({ email: email_toSearch }));
        
        // ----------------------- validation of query
        if(user_found != null){ 
            return { result: false,
                     data:null, 
                     error: "email already in use"
                    };
        }

        //-------------------------- Email is not in use
        // Construct Schema
        const newUser = new user_schema({   email   : email_new,
                                            password: password_new, 
                                            name    : name_new,
                                            balance : 0 // default value
                                        });
        // Save the new user
        return {result: true, data:removeIdAndV( await newUser.save()), error: null};

    }catch (error_message) {
        return {result: false, data: null, error: error_message};
    }
}

/** ===================================== Validate Login ================================================
 * ------------ Validating login
 * Give it a username and password. It searches the database, if the username is foun
 * If a user is found then it returns the email name and balance.
 */
async function validateLogin(email_toSearch, password_toSearch) {
    try {
        const user_found = removeIdAndV(await user_schema.findOne({ email   : email_toSearch,
                                                                    password: password_toSearch }));
        
        // --------------------- (Validation of Query) No user Found
        if (user_found == null) {
            return { result: false, data: null, error: "No user found that matches the email: " + email_toSearch };
        }
        
        // --------------------- User Found (returning stuff)
        return { result: true, data:{   email   : user_found.email,
                                        name    : user_found.name,
                                        balance : user_found.balance
                                    }, error: null };

    } catch (error_message) {
        return {result: false, data: null, error: error_message};
    }
}
/** ===================================== Reset Password ================================================
 * ------------ Reset Password
 * Takes in an email and the new password and replaces it in the database
 * Should also return the user (email, name, balance) but not the password (security)
 */
async function resetPassword(email_toSearch, password_toReset) {
    try {
        const user_updated = removeIdAndV(await user_schema.findOneAndUpdate(
                                                { email : email_toSearch },                 // Search by email
                                                { $set  : { password: password_toReset } }, // Reset password
                                                { new   : true }                            // Specify to return updated entry
                                            ));
                                            
        // --------------------- No user Found (Cannot reset password)
        if (user_updated == null) {
            return { result: false, data: null, error: "No user found that matches the email: " + email_toSearch };
        }
        
        // --------------------- User Found (returning stuff)
        return {result: true, data:{    email   : user_updated.email,
                                        name    : user_updated.name,
                                        balance : user_updated.balance
                                    }, error: null };

    } catch (error_message) {
        return {result: false, data: null, error: error_message};
    }
}
/** =============================== Update User Balance ================================================
 * ------------ Updating the user balance
 * Give an email and a quantity (+/-) by which to update the balance
 * Should also return the user (email, name, balance) but not the password (security)
 */
async function updateUserBalance(email_toSearch, amount_toAdd) {
    try {
        // --------------------- Find User's Current Balance
        const user_updated = removeIdAndV(await user_schema.findOneAndUpdate({ email : email_toSearch },            // Search by Email
                                                                             { $inc  : { balance: amount_toAdd } }, // Increment value by amount
                                                                             { new   : true }                       // Return updated
                                                                            ));

        // --------------------- No user Found (Cannot update Balance)
        if (user_updated == null) {
            return {result: false, data: null, error: "No user found that matches the email: " + email_toSearch };
        }

        // --------------------- User Found (returning stuff)
        return {result: true, data:{    email   : user_updated.email,
                                        name    : user_updated.name,
                                        balance : user_updated.balance
                                    }, error: null };

    } catch (error_message) {
        return {result: false, data: null, error: error_message };
    }
}
/**===================================== Delete User =====================================================
 * ------------ Deliting a user
 * Should delete a user relating to the given email
 * returns true or false
 */
async function deleteUser(email_toSearch) {
    try {
        // --------------------- Deleting
        await UserModal.findOneAndDelete({ email: email_toSearch });

        // --------------------- Returning stuff
        return {result: true, data: null, error: null };
    } catch (error) {
        return {result: false, data: null, error: error_message };
    }
}


/** ===================================== Exporting ======================================================
 * ------------ Exportation of functions
 * Export the functions
 * Can rename them
 */


module.exports = {
    retrieveUser        : retrieveUser,
    registerUser        : registerUser,
    validateLogin       : validateLogin,
    resetPassword       : resetPassword,
    updateUserBalance   : updateUserBalance,
    deleteUser          : deleteUser
};