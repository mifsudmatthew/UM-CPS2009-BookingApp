const user_schema = require("../schemas/user_schema");


//===================================== Utility Functions ================================================

/** ------------ Removes Mongoose Generated Stuff
 */
function removeIdAndV(document) {
    const { _id, __v, ...cleanedDocument } = document;
    return cleanedDocument;
}

/** ================================= Retrieves the User
 */
async function retrieveUser(email_toSearch) {
    try {
        const user_found = removeIdAndV( await user_schema.findOne({ email: email_toSearch }));

        if (!user_found) {
            return { result: false, data: {}, error: "No user found that matches the email: " + email_toSearch };
        }
        
        return { result: true, data: user_found, error: null };

    } catch (error_message) {
        console.error("Error retrieving users:", error_message);
        return {result: false, data: null, error: error_message};
    }
}

//===================================== Saving User ================================================
/**
 * @param {{String, String, String}}
 * @returns Document
 */
async function register({email_new, password_new,  name_new}){
    try {

        // ----------------------- Check if email is in use
        ret = await retrieveUser(email)
        if(ret.result == true){ // Error email found
            return {result: false, data:null, error: "email already in use"};
        }else if(ret.data == null){ // Error connection related
            return {result: false, data:null, error: ret.error};
        }

        //-------------------------- Email is not in use
        // Construct a new user document based on the schema
        const newUser = new user_schema({   email: email_new,
                                            password: password_new, 
                                            name: name_new,
                                            balance:0 
                                        });
        // Save the new user
        return {result: true, data:removeIdAndV( await newUser.save()), error: null};

    } catch (error_message) {
        return {result: false, data: null, error: error_message};
    }
}
//===================================== Validate Login ================================================

async function validateLogin(email_toSearch, password_toSearch) {
    try {
        const user_found = removeIdAndV(await user_schema.findOne({ email: email_toSearch,
                                                                    password: password_toSearch }));
        
        // --------------------- No user Found
        if (!user_found) {
            return { result: false, data: null, error: "No user found that matches the email: " + email_toSearch };
        }
        
        // --------------------- User Found
        return { result: true, data:{ user:{    email: user_found.email,
                                                name: user_found.name,
                                                balance: user_found.balance
                                            }
                                    }, error: null };

    } catch (error_message) {
        return {result: false, data: null, error: error_message};
    }
}
//===================================== Reset Password ================================================
async function resetPassword(email_toSearch, password_toReset) {
    try {
        const user_found = removeIdAndV(await user_schema.findOne({ email: email_toSearch }));
        
        // --------------------- No user Found
        if (!user_found) {
            return { result: false, data: null, error: "No user found that matches the email: " + email_toSearch };
        }
        
        // --------------------- User Found
        const updatedUser = await user_schema.findOneAndUpdate(
            { email },
            { $set: { password: password_toReset } },
            { new: true }
        );
        return {result: true, data: updatedUser, error: null };

    } catch (error_message) {
        return {result: false, data: null, error: error_message};
    }
}
//=============================== Update User Balance ================================================
async function updateUserBalance(email_toSearch, amount_toAdd) {
    try {
        const user_found = await retrieveUser(({ email }));
        
        if (!user_found) {
            return {result: false, data: null, error: "No user found that matches the email: " + email_toSearch };
        }
        
        // Calculate the new balance by adding the input amount to the current balance
        const newBalance = user_found.balance + amount_toAdd;

        // Update the user's balance using the $set operator to set the new balance
        const updatedUser = await user_schema.findOneAndUpdate(
            { email },
            { $set: { balance: newBalance } },
            { new: true }
        );
        
        return {result: true, data: updatedUser, error: null };

    } catch (error_message) {
        return {result: false, data: null, error: error_message };
    }
}
//===================================== Update User Balance ================================================
async function deleteUser(email_toSearch) {
    try {
        await UserModal.findOneAndDelete({ email_toSearch });
        return {result: true, data: null, error: null };
    } catch (error) {
        return {result: false, data: null, error: error_message };
    }
}

module.exports = {
    retrieveUser        : retrieveUser,
    register            : register,
    validateLogin       : validateLogin,
    resetPassword       : resetPassword,
    updateUserBalance   : updateUserBalance,
    deleteUser          : deleteUser
};