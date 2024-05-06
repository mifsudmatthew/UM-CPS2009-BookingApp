/* api.js
 * Holds the routes that fall under '/api/*' */

const express = require("express");
const apiRouter = express.Router();

// Authentication
const jwt = require("jsonwebtoken");
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
 * Returns:
 *  200 -> When token Valid
 *  400 -> No authorization field attached
 *  403 -> No token is attached to field
 *      OR Token supplied is invalid
 */
apiRouter.post("/authenticate", sf.authenticateToken, (req, res) => {
  res.status(200).json({ message: "Ok" }).end();
});

// To refresh the token
// NOT USED
apiRouter.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    // Check if refresh token is sent in request
    return res.status(401).json({ error: "No refresh token attached" });
  }

  // Verify refreshToken
  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
    if (err) {
      // When error occurs
      return res.sendStatus(403).json({ error: "Invalid refresh token" });
    }

    // Generate the two new tokens
    const accessToken = sf.generateAccessToken(user);
    const newRefreshToken = sf.generateRefreshToken(user);

    // Send tokens back
    res.json({ accessToken: accessToken, refreshToken: newRefreshToken });
  });
});

/**
 * Validates the user's information with the database
 * Returns:
 *  200 -> Valid Login
 *  400 -> Passwords do not match or Email not in use
 *  500 -> Failed Login
 */
apiRouter.post("/login", async (req, res) => {
  const email = req.body.email; // Obtaining the email inputted by the user.
  const password = req.body.password; // Obtaining the password inputted by the user.

  try {
    // Retrieving user data with a matching email from the database.
    const dbUser = await user_queries.retrieveUser(email);

    // Check if email exists
    if (!dbUser.result) {
      // Email no exist
      return res.status(400).json({ error: "Email not in use" });
    }

    // If email exists, check if password matches the hashed password in the database
    if (await bcrypt.compare(password, dbUser.data.password)) {
      // Store user data in a variable
      const user = {
        id: dbUser.data._id,
        email: dbUser.data.email,
        name: dbUser.data.name,
        balance: dbUser.data.balance,
        admin: dbUser.data.admin,
      };

      // Generate access token with the user data
      const accessToken = sf.generateAccessToken(user);

      // NOT USED
      // const refreshToken = sf.generateRefreshToken(user);

      // Send user data and tokens back
      res.json({
        accessToken: accessToken,
        // NOT USED
        // refreshToken: refreshToken,
      });
    } else {
      return res.status(400).json({ error: "Passwords do not match" });
    }
  } catch (err) {
    return res.status(500).json({ error: `Failed to login user: ${err}` });
  }
});

/**
 * Creates a new user in the database
 * Returns:
 *  200 -> Valid Registration
 *  400 -> Email already in use
 *  500 -> Failed Registration
 */
apiRouter.post("/register", async (req, res) => {
  const name = req.body.name; // Obtaining the name inputted by the user.
  const email = req.body.email; // Obtaining the email inputted by the user.
  const password = req.body.password; // Obtaining the password inputted by the user.

  try {
    const dbUser = await user_queries.retrieveUser(email); // Retrieving user data with a matching email from the database.

    // Check if email exists
    if (dbUser.result) {
      // Email no exist
      return res.status(400).json({ error: "Email already in use" });
    }

    // If email does not exist, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    /* No need to check result of registerUser as it throws error now */

    // Register user in the database
    await user_queries.registerUser({
      name_new: name,
      email_new: email,
      password_new: hashedPassword,
    });

    // Return success
    return res.status(200).json({ message: "User successfully registered" });
  } catch (err) {
    return res.status(500).json({ error: `Failed to register user: ${err}` });
  }
});

/**
 * Route for sending an email to reset password.
 * Returns:
 *  200 -> On Success
 *  500 -> On Failure
 */
apiRouter.post("/reset", async (req, res) => {
  try {
    // Attempting to send an email
    let result = await sf.sendPinByMail(req.body.email);
    // If result is obtained, response success.
    res.status(200).json(result);
  } catch (error) {
    // Response failure
    res.status(500).json({ message: "Error sending email" });
  }
});

/**
 * Route to for changing password when not logged in. (Reset Password)
 * Returns:
 *  200 -> Reset Success
 *  400 -> Reset Failure
 */
apiRouter.post("/resetpassword", async (req, res) => {
  // Obtain the index of the element that matches the same pin and email, otherwise return -1
  let matchedIndex = sf.accountPins.findIndex(
    (entry) => entry.pin === req.body.pin && entry.email === req.body.email
  );

  // If entry was found
  if (matchedIndex != -1) {
    // Set a new password to the account of the given email, after encrypting it.
    console.log(
      await user_queries.resetPassword(
        currentUserEmail,
        await bcrypt.hash(req.body.password, 10)
      )
    );
    // Success Response
    return res.status(200).json({ message: "Success" });
  }
  // Failure Response
  res.status(400).json({ message: "Fail" });
});

/**
 * Route to for changing password both when logged in and after obtaining the pin when reseting password.
 * Returns:
 *  200 -> Password Change Success
 *  500 -> Password Change Failure
 */
apiRouter.post("/changepassword", sf.authenticateToken, async (req, res) => {
  try {
    // Attempt to  a new password to the account of the given email, after encrypting it.
    console.log(
      await user_queries.resetPassword(
        req.user.email,
        await bcrypt.hash(req.body.password, 10)
      )
    );
    // Response Success
    res.status(200).json({ message: "Password Changed!" });
  } catch (error) {
    // Response Fail
    res.status(500).json({ message: "Password Change Failed!" });
  }
});

/**
 * Route to for changing details of the user
 * Returns:
 *  200 -> Details Change Success
 *  500 -> Details Change Failure
 */
apiRouter.post("/changedetails", sf.authenticateToken, async (req, res) => {
  try {
    // Attempt to change the details of the user
    const response = await user_queries.changeDetails(
      req.user.email,
      req.body.name,
      req.body.email
    );
    console.log(response);

    // Generate a new access token
    const accessToken = sf.generateAccessToken(response.data);

    // Response Success
    res.status(200).json({
      message: "Details Changed!",
      data: { accessToken, ...response.data },
    });
  } catch (error) {
    // Response Fail
    res.status(500).json({ message: "Details Change Failed!" });
  }
});

apiRouter.get("/token", sf.authenticateToken, async (req, res) => {
  const response = await sf.getUpdatedToken(req.user.email);

  if (!response.result) return res.status(400).json({ error: response.error });

  res.status(200).json({ accesstoken: response.data.accesstoken });
});

module.exports = apiRouter;
