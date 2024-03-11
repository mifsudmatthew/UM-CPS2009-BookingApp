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

let currentUserEmail = "";

// Log the current URL that is accessed
apiRouter.use((req, _res, next) => {
  console.log(`API on ${req.url}`);
  next();
});

// Testing
apiRouter.post("/test", sf.authenticateToken, (req, res) => {
  res.json();
});

// To refresh the token
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

apiRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // TEMP
  // Temporary gloabl email for testing
  currentUserEmail = email;
  // TEMP

  try {
    const dbUser = await queries.retrieveUser(email);

    // Check if email exists
    if (!dbUser.result) {
      // Email no exist
      return res.status(400).send("Email not in use");
    }

    // Email exists
    if (await bcrypt.compare(password, dbUser.data.password)) {
      const user = {
        id: dbUser.data._id,
        email: dbUser.data.email,
        name: dbUser.data.name,
        balance: dbUser.data.balance,
      };

      const accessToken = sf.generateAccessToken(user);
      const refreshToken = sf.generateRefreshToken(user);

      res.json({
        ...user,
        accessToken: accessToken,
        refreshToken: refreshToken,
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
      return res.status(400).send("Email already in use");
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

apiRouter.post("/reset", (req, res) => {
  console.log("Connected to reset page");
  sf.sendPinByMail(req.body.email, res);
});

apiRouter.post("/resetpassword", async (req, res) => {
  for (i = 0; i < sf.accountPins.length; i++) {
    if (
      sf.accountPins[i].pin == req.body.pin &&
      sf.accountPins[i].email == req.body.email
    ) {
      console.log(
        await queries.resetPassword(
          currentUserEmail,
          await bcrypt.hash(req.body.password, 10)
        )
      );
      return res.json({ message: "Success" });
    }
  }
  res.status(400).json({ message: "Fail" });
});

apiRouter.post("/booking", sf.authenticateToken, (req, res, next) => {
  console.log("Booking request has been received!");
  db.saveTestCase();
  res.json({ message: "Booking added" });
});

apiRouter.post("/changepassword", sf.authenticateToken, async (req, res) => {
  for (i = 0; i < sf.accountPins.length; i++) {
    if (
      sf.accountPins[i].pin == req.body.pin &&
      sf.accountPins[i].email == req.body.email
    ) {
      console.log(
        await queries.resetPassword(
          currentUserEmail,
          await bcrypt.hash(req.body.password, 10)
        )
      );
      return res.json({ message: "Success" });
    }
  }
  res.status(400).json({ message: "Fail" });
});

module.exports = apiRouter;
