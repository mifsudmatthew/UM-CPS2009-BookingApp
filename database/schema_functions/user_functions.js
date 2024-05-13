const user_schema = require("../schemas/user_schema");

/**
 * Retrieve a user by email.
 * @param {string} email_toSearch - The email of the user to retrieve.
 * @returns {Object} An object containing the result, data, and error.
 */
async function retrieveUser(email_toSearch) {
  try {
    // -------------------- Run Query
    const user_found = await user_schema.findOne({ email: email_toSearch });

    // -------------------- Validation
    if (user_found == null) {
      throw new Error(
        `No user found that matches the email: ${email_toSearch}`
      );
    }

    // -------------------- Succesfully returnig the found user
    return { result: true, data: user_found, error: null };
  } catch (err) {
    console.error(`retrieveUser: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Register a new user.
 * @param {Object} userDetails - Details of the user to register.
 * @returns {Object} An object containing the result, data, and error.
 */
async function registerUser({ email_new, password_new, name_new }) {
  try {
    // ----------------------- Check if email is in use
    const user_found = await user_schema.findOne({ email: email_new });

    // ----------------------- validation of query
    if (user_found != null) {
      throw new Error("Email already in use");
    }

    //-------------------------- Email is not in use
    // Construct Schema
    const newUser = new user_schema({
      email: email_new,
      password: password_new,
      name: name_new,
      balance: 0, // default value
    });

    // Save the new user
    return { result: true, data: await newUser.save(), error: null };
  } catch (err) {
    console.error(`registerUser: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Validate login credentials.
 * @param {string} email_toSearch - The email to validate.
 * @param {string} password_toSearch - The password to validate.
 * @returns {Object} An object containing the result, data, and error.
 */
async function validateLogin(email_toSearch, password_toSearch) {
  try {
    const user_found = await user_schema.findOne({
      email: email_toSearch,
      password: password_toSearch,
    });

    // --------------------- (Validation of Query) No user Found
    if (user_found == null) {
      throw new Error(
        `No user found that matches the email: ${email_toSearch}`
      );
    }

    // --------------------- User Found (returning stuff)
    return {
      result: true,
      data: {
        email: user_found.email,
        name: user_found.name,
        balance: user_found.balance,
      },
      error: null,
    };
  } catch (err) {
    console.error(`validateLogin: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Reset user password.
 * @param {string} email_toSearch - The email of the user to reset the password for.
 * @param {string} password_toReset - The new password.
 * @returns {Object} An object containing the result, data, and error.
 */
async function resetPassword(email_toSearch, password_toReset) {
  try {
    const user_updated = await user_schema.findOneAndUpdate(
      { email: email_toSearch }, // Search by email
      { $set: { password: password_toReset } }, // Reset password
      { new: true } // Specify to return updated entry
    );

    // --------------------- No user Found (Cannot reset password)
    if (user_updated == null) {
      throw new Error(
        `No user found that matches the email: ${email_toSearch}`
      );
    }

    // --------------------- User Found (returning stuff)
    return {
      result: true,
      data: {
        email: user_updated.email,
        name: user_updated.name,
        balance: user_updated.balance,
      },
      error: null,
    };
  } catch (err) {
    console.error(`resetPassword: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}
/**
 * Update user balance.
 * @param {string} email_toSearch - The email of the user to update the balance for.
 * @param {number} amount_toAdd - The amount to add to the balance.
 * @returns {Object} An object containing the result, data, and error.
 */
async function updateUserBalance(email_toSearch, amount_toAdd) {
  try {
    // --------------------- Find User's Current Balance
    const user_updated = await user_schema.findOneAndUpdate(
      { email: email_toSearch }, // Search by Email
      { $inc: { balance: amount_toAdd } }, // Increment value by amount
      { new: true } // Return updated
    );

    // --------------------- No user Found (Cannot update Balance)
    if (user_updated == null) {
      throw new Error(
        `No user found that matches the email: ${email_toSearch}`
      );
    }

    // --------------------- User Found (returning stuff)
    return {
      result: true,
      data: {
        email: user_updated.email,
        name: user_updated.name,
        balance: user_updated.balance,
      },
      error: null,
    };
  } catch (err) {
    console.error(`updateUserBalance: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Delete a user by email.
 * @param {string} email_toSearch - The email of the user to delete.
 * @returns {Object} An object containing the result, data, and error.
 */
async function deleteUser(email_toSearch) {
  try {
    // --------------------- Deleting
    await UserModal.findOneAndDelete({ email: email_toSearch });

    // --------------------- Returning stuff
    return { result: true, data: null, error: null };
  } catch (err) {
    console.error(`deleteUser: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Change user details.
 * @param {string} email_toSearch - The email of the user to change details for.
 * @param {string} name_toReset - The new name.
 * @param {string} email_toReset - The new email.
 * @returns {Object} An object containing the result, data, and error.
 */
async function changeDetails(email_toSearch, name_toReset, email_toReset) {
  try {
    // Attempt to update the user with the given information
    const details_updated = await user_schema.findOneAndUpdate(
      { email: email_toSearch },
      { $set: { name: name_toReset, email: email_toReset } },
      { new: true }
    );

    // If no user found
    if (!details_updated) {
      throw new Error(
        `Possibly no user found that matches the email: ${email_toSearch}`
      );
    }

    return {
      result: true,
      data: {
        _id: details_updated._id,
        email: details_updated.email,
        name: details_updated.name,
        balance: details_updated.balance,
        admin: details_updated.admin,
      },
      error: null,
    };
  } catch (err) {
    console.error(`changeDetails: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Exported functions for user queries.
 */
module.exports = {
  retrieveUser: retrieveUser,
  registerUser: registerUser,
  validateLogin: validateLogin,
  resetPassword: resetPassword,
  updateUserBalance: updateUserBalance,
  deleteUser: deleteUser,
  changeDetails: changeDetails,
};
