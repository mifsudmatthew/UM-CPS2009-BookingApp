/* api.js
 * Holds the routes that fall under '/api/*' */

const express = require("express");
const apiRouter = express.Router();

// Authentication
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Database
const db = require("../database/test_functions");
const queries = require("../database/schema_functions/user_functions");

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
 *  400
 */
apiRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const dbUser = await queries.retrieveUser(email);

    // Check if email exists
    if (!dbUser.result) {
      // Email no exist
      return res.status(400).json({ error: "Email not in use" });
    }

    // Email exists
    if (await bcrypt.compare(password, dbUser.data.password)) {
      const user = {
        id: dbUser.data._id,
        email: dbUser.data.email,
        name: dbUser.data.name,
        balance: dbUser.data.balance,
        admin: dbUser.data.admin,
      };

      const accessToken = sf.generateAccessToken(user);
      // NOT USED
      // const refreshToken = sf.generateRefreshToken(user);

      res.json({
        ...user,
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

apiRouter.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const dbUser = await queries.retrieveUser(email);

    // Check if email exists
    if (dbUser.result) {
      // Email no exist
      return res.status(400).json({ error: "Email already in use" });
    }

    // Email exists
    const hashedPassword = await bcrypt.hash(password, 10);

    /* No need to check result of registerUser as it throws error now */

    // Register user on DB
    await queries.registerUser({
      name_new: name,
      email_new: email,
      password_new: hashedPassword,
    });

    // User added to DB
    return res.status(200).json({ message: "User successfully registered" });
  } catch (err) {
    return res.status(500).json({ error: `Failed to register user: ${err}` });
  }
});

// Route for sending an email to reset password.
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

// Route to for changing password when resetting thus not logged in.
apiRouter.post("/resetpassword", async (req, res) => {
  // Obtain the index of the element that matches the same pin and email, otherwise return -1
  let matchedIndex = sf.accountPins.findIndex(
    (entry) => entry.pin === req.body.pin && entry.email === req.body.email
  );

  // If entry was found
  if (matchedIndex != -1) {
    // Set a new password to the account of the given email, after encrypting it.
    console.log(
      await queries.resetPassword(
        currentUserEmail,
        await bcrypt.hash(req.body.password, 10)
      )
    );
    // Success Response
    return res.json({ message: "Success" });
  }
  // Failure Response
  res.status(400).json({ message: "Fail" });
});

// Route to for changing password both when logged in.
apiRouter.post("/changepassword", sf.authenticateToken, async (req, res) => {
  try {
    // Attempt to  a new password to the account of the given email, after encrypting it.
    console.log(
      await queries.resetPassword(
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

// Route to for changing password both when logged in.
apiRouter.post("/changedetails", sf.authenticateToken, async (req, res) => {
  try {
    // Attempt to  a new password to the account of the given email, after encrypting it.

    const response = await queries.changeDetails(
      req.user.email,
      req.body.name,
      req.body.email
    );
    console.log(response);

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

  if (!response.result) res.status(400).json({ error: response.error });

  res.status(200).json({ accesstoken: response.data.accesstoken });
});

module.exports = apiRouter;
