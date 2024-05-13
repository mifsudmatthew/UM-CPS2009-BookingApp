/**
 * @file stripe_functions.js
 * @desc Defines all the database stripe functions
 */

const stripe_schema = require("../schemas/stripe_schema");

/**
 * Retrieve a Stripe session by session ID.
 * @category Database
 * @param {string} session_id - The session ID to search for.
 * @returns {Object} An object containing the result, data, and error.
 */
async function retrieveStripe(session_id) {
  try {
    // -------------------- Run Query
    stripe_found = await stripe_schema.findOne({ sessionID: session_id });

    // -------------------- Validation
    if (stripe_found == null) {
      return {
        result: false,
        data: null,
        error: "No sessions found matching the ID: " + session_id,
      };
    }

    // -------------------- Succesfully returnig the found user
    return { result: true, data: stripe_found, error: null };
  } catch (error_message) {
    throw new Error("Failed to Connect to Database");
  }
}

/**
 * Register a new Stripe session entry.
 * @category Database
 * @param {Object} sessionDetails - Details of the session to register.
 * @returns {Object} An object containing the result, data, and error.
 */
async function registerStripe({ session_id, email_new, amount_new }) {
  try {
    stripe_found = await stripe_schema.findOne({ sessionID: session_id });

    // ----------------------- validation of query
    if (stripe_found != null) {
      return { result: false, data: null, error: "sessions already in use" };
    }
    // Construct Schema
    const newSession = new stripe_schema({
      sessionID: session_id,
      email: email_new,
      amount: amount_new,
    });
    // Save the new user
    return { result: true, data: await newSession.save(), error: null };
  } catch (error_message) {
    throw new Error("Failed to Connect to Database");
  }
}

/**
 * Exported functions for Stripe operations.
 */
module.exports = {
  registerStripe: registerStripe,
  retrieveStripe: retrieveStripe,
};
