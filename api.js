const express = require("express");
const apiRouter = express.Router();

// Authentication
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mongoose = require("./database/mongoose"); // Running the database
const db = require("./database/test_functions");
const queries = require("./database/schema_functions/user_functions");
const sf = require("./server_functions");

// Log the current URL that is accessed
apiRouter.use((req, _res, next) => {
  console.log(`API on ${req.url}`);
  next();
});

apiRouter.post("/authenticate", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (true) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(user.data, process.env.JWT_ACCESS, {
      expiresIn: "15m",
    });
    res.json({ accessToken: accessToken });
  });
});

apiRouter.post("/reset", sf.authenticate, (req, res) => {
  console.log("Connected to reset page");
  sf.sendPinByMail(res);
});

apiRouter.post("/booking", sf.authenticate, (req, res, next) => {
  console.log("Booking request has been received!");
  db.saveTestCase();
  res.json({ message: "Booking added" });
});

apiRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const dbUser = await queries.retrieveUser(email);
  console.log(dbUser);

  // Check if email exists
  if (!dbUser.result) {
    // Duplicate email
    return res.status(400).send("Email not in use").end();
  }
  // Email no exists

  try {
    if (await bcrypt.compare(password, dbUser.data.password)) {
      const user = await queries.validateLogin(email, password);
      const accessToken = jwt.sign(user.data, process.env.JWT_ACCESS, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(user.data, process.env.JWT_REFRESH);

      console.log(`${accessToken}\n\n${refreshToken}`);

      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      return res.status(401).send("Not Allowed");
    }
  } catch {
    return res.status(500).send("Some kind of error in login");
  }
});

apiRouter.post("/changepassword", sf.authenticate, async (req, res) => {
  for (i = 0; i < sf.accountPins.length; i++) {
    if (
      sf.accountPins[i].pin == req.body.pin &&
      sf.accountPins[i].email == req.body.email
    ) {
      console.log(
        await queries.resetPassword(req.body.email, req.body.password)
      );
    }
  }
});

apiRouter.post("/register", async (req, res) => {
  const email = req.body.email;

  // Check if email exists
  if (await queries.retrieveUser(email).result) {
    // Duplicate email
    return res.status(401).send("Email already in use").end();
  }
  // Email no exists

  const name = req.body.name;
  const password = await bcrypt.hash(req.body.password, 10);
  console.log(password);
  // Register user on DB
  const response = await queries.registerUser({
    email_new: email,
    password_new: password,
    name_new: name,
  });

  if (response.result) {
    // User added to DB
    res.status(200).send("User Registered").end();
  } else {
    // Failed to add User to DB
    res.status(401).send(response.error).end();
  }
});

module.exports = apiRouter;
