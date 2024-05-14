/**
 * @file api.js
 * @desc Holds the routes that fall under '/api/*'
 */

const express = require("express");
const apiRouter = express.Router();

// Authentication
const bcrypt = require("bcryptjs");

// Obtaining the database schema functions for user
const user_queries = require("../database/schema_functions/user_functions");

// Util functions
const sf = require("./server_functions");

// Log the current URL that is accessed
apiRouter.use((req, _res, next) => {
  console.log(`API on ${req.url}`);
  next();
});

/**
 * Route checks that the attached token header is valid.
 * @category Back-end
 * @param None
 * @return
 * - 200: When token Valid
 * - 400: No authorization field attached
 * - 403: No token is attached to field OR Token supplied is invalid
 */
apiRouter.post("/authenticate", sf.authenticateToken, (_req, res) => {
  return res.status(200).json({ result: true, data: null, error: null });
});

/**
 * Validates the user's information with the database.
 * @category Back-end
 * @param None
 * @return
 * - 200: Valid Login
 * - 400: Passwords do not match or Email not in use
 * - 500: Failed Login
 */
apiRouter.post("/login", async (req, res) => {
  // Obtaining the email inputted by the user.
  const email = req.body.email;
  // Obtaining the password inputted by the user.
  const password = req.body.password;
  // Retrieving user data with a matching email from the database.
  let response = await user_queries.retrieveUser(email);
  let passwordMatch = false;

  // Check if email exists
  if (!response.result) {
    // Email no exist
    return res
      .status(400)
      .json({ result: false, data: null, error: response.error });
  }

  const user = response.data;

  // If email exists, check if password matches the hashed password in the database
  try {
    passwordMatch = await bcrypt.compare(password, user.password);
  } catch (err) {
    return res.status(500).json({
      result: false,
      data: null,
      error: `Error in bcrypt: ${err}`,
    });
  }

  if (!passwordMatch) {
    return res
      .status(400)
      .json({ result: false, data: null, error: "Passwords do not match" });
  }

  // Store user data in a variable
  const userData = {
    id: user._id,
    email: user.email,
    name: user.name,
    balance: user.balance,
    admin: user.admin,
  };

  // Generate access token with the user data
  const accessToken = await sf.generateAccessToken(userData);

  // Send user data and tokens back
  return res.status(200).json({ result: true, data: accessToken, error: null });
});

/**
 * Creates a new user in the database.
 * @category Back-end
 * @param None
 * @return
 * - 200: Valid Registration
 * - 400: Email already in use
 * - 500: Failed Registration
 */
apiRouter.post("/register", async (req, res) => {
  const name = req.body.name; // Obtaining the name inputted by the user.
  const email = req.body.email; // Obtaining the email inputted by the user.
  const password = req.body.password; // Obtaining the password inputted by the user.
  let hashedPassword = "";

  let response = await user_queries.retrieveUser(email); // Retrieving user data with a matching email from the database.

  // Check if email exists
  if (response.result) {
    // Email exist
    return res
      .status(400)
      .json({ result: false, data: null, error: response.error });
  }

  // If email does not exist, hash the password
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return res.status(500).json({
      result: false,
      data: null,
      error: `Error in bcrypt: ${err}`,
    });
  }

  // Register user in the database
  response = await user_queries.registerUser({
    name_new: name,
    email_new: email,
    password_new: hashedPassword,
  });

  // Return Failure
  if (!response.result) {
    return res.status(400).json({
      result: false,
      data: null,
      error: `Failed to register user: ${response.error}`,
    });
  }

  // Return success
  return res.status(200).json({
    result: true,
    data: null,
    error: null,
  });
});

/**
 * Route for sending an email to reset password.
 * @category Back-end
 * @param None
 * @return
 * - 200: On Success
 * - 500: On Failure
 */
apiRouter.post("/reset", async (req, res) => {
  const email = req.body.email;

  // Attempting to send an email
  const response = await sf.sendPinByMail(email);

  // Response failure
  if (!response.result) {
    return res
      .status(500)
      .json({ result: false, data: null, error: response.error });
  }

  // Response success.
  return res
    .status(200)
    .json({ result: true, data: response.data, error: null });
});

/**
 * Route for changing password when not logged in (Reset Password).
 * @category Back-end
 * @param None
 * @return
 * - 200: Reset Success
 * - 400: Reset Failure
 */
apiRouter.post("/resetpassword", async (req, res) => {
  const userPin = req.body.pin;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  let hashedPassword = "";

  try {
    hashedPassword = await bcrypt.hash(userPassword, 10);
  } catch (err) {
    return res
      .status(500)
      .json({ result: false, data: null, error: `bcrypt: ${err}` });
  }

  // Obtain the index of the element that matches the same pin and email, otherwise return -1
  let matchedIndex = sf.accountPins.findIndex(
    (entry) => entry.pin === userPin && entry.email === userEmail
  );

  // If entry was found
  if (matchedIndex != -1) {
    // Set a new password to the account of the given email, after encrypting it.
    const response = await user_queries.resetPassword(
      currentUserEmail,
      hashedPassword
    );

    // Success Response
    if (response.result) {
      return res.status(200).json({ result: true, data: null, error: null });
    }
  }

  // Failure Response
  return res.status(400).json({ result: false, data: null, error: null });
});

/**
 * Route for changing password both when logged in and after obtaining the pin when resetting password.
 * @category Back-end
 * @param None
 * @return
 * - 200: Password Change Success
 * - 400: Password Change Failure
 */
apiRouter.post("/changepassword", sf.authenticateToken, async (req, res) => {
  const email = req.user.email;
  const password = req.body.password;
  let hashedPassword = "";

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return res.status(500).json({
      result: false,
      data: null,
      error: `bcrypt: ${err}`,
    });
  }

  // Attempt to  a new password to the account of the given email, after encrypting it.
  const response = await user_queries.resetPassword(email, hashedPassword);

  if (!response.result) {
    // Response Fail
    return res.status(400).json({
      result: false,
      data: null,
      error: null,
    });
  }

  // Response Success
  return res.status(200).json({
    result: true,
    data: null,
    error: null,
  });
});

/**
 * Route for changing details of the user.
 * @category Back-end
 * @param None
 * @return
 * - 200: Details Change Success
 * - 500: Details Change Failure
 */
apiRouter.post("/changedetails", sf.authenticateToken, async (req, res) => {
  // Attempt to change the details of the user
  const oldEmail = req.user.email;
  const name = req.body.name;
  const newEmail = req.body.email;

  const response = await user_queries.changeDetails(oldEmail, name, newEmail);

  console.log(response);

  // Response Fail
  if (!response.result) {
    return res.status(500).json({
      result: false,
      data: null,
      error: `Details Change Failed! ${response.error}`,
    });
  }

  // Generate a new access token
  const accessToken = sf.generateAccessToken(response.data);

  // Response Success
  return res.status(200).json({
    result: true,
    data: { accessToken, ...response.data },
    error: null,
  });
});

apiRouter.get("/token", sf.authenticateToken, async (req, res) => {
  const email = req.user.email;
  const response = await sf.getUpdatedToken(email);

  // Response Success
  if (response.result)
    return res.status(200).json({
      result: true,
      data: response.data,
      error: null,
    });

  // Response Fail
  return res
    .status(400)
    .json({ result: false, data: null, error: response.error });
});

module.exports = apiRouter;
