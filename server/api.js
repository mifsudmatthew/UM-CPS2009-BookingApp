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

// Variable to store 
let currentUserEmail = "";

// Log the current URL that is accessed
apiRouter.use((req, _res, next) => {
  console.log(`API on ${req.url}`);
  next();
});

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

// Route for sending an email to reset password.
apiRouter.post("/reset", async (req, res) => {
  console.log("Connected to reset page");
  try{ // Attempting to send an email
    let result = await sf.sendPinByMail(req.body.email);
    // If result is obtained, response success.
    res.status(200).json(result);
  }catch(error){
    // Response failure
    res.status(500).json({message: "Error sending email"});
  }
});

// Route to for changing password when resetting thus not logged in.
apiRouter.post("/resetpassword", async (req, res) => {

  // Obtain the index of the element that matches the same pin and email, otherwise return -1
  let matchedIndex = sf.accountPins.findIndex(entry => entry.pin === req.body.pin 
  && entry.email === req.body.email);

  // If entry was found
  if(matchedIndex!=-1){

    // Set a new password to the account of the given email, after encrypting it.
    console.log(await queries.resetPassword(currentUserEmail, await bcrypt.hash(req.body.password, 10)));
    // Success Response
    return res.json({ message: "Success" });
  }
  // Failure Response
  res.status(400).json({ message: "Fail" });
});

apiRouter.post("/booking", sf.authenticateToken, (req, res, next) => {
  court = req.body.court;
  user = req.body.user.userID;
  
  console.log("Booking request has been received!");
  db.saveTestCase();
  res.json({ message: "Booking added" });
});


// Route to for changing password both when logged in.
apiRouter.post("/changepassword", sf.authenticateToken, async (req, res) => {
    
    try{
      // Attempt to  a new password to the account of the given email, after encrypting it.
      console.log(await queries.resetPassword(req.user.email, await bcrypt.hash(req.body.password, 10)));
      // Response Success
      res.status(200).json({message: "Password Changed!"});
    }catch(error){
      // Response Fail
      res.status(500).json({message: "Password Change Failed!"});
    }
});

module.exports = apiRouter;
