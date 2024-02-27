const express = require("express");
const apiRouter = express.Router();

const mongoose = require("./database/mongoose"); // Running the database
const db = require("./database/test_functions");
const serverFunctions = require("./server_functions");
const queries = require("./database/schema_functions/user_functions");

apiRouter.use((req, res, next) => {
  console.log(`API on ${req.url}`);
  next();
});

apiRouter.get("/reset", (req, res) => {
  console.log("Connected to reset page");
  serverFunctions.sendPinByMail(res);
});

apiRouter.post("/booking", (req, res, next) => {
  console.log("Booking request has been received!");
  db.saveTestCase();
  res.json({ message: "Booking added" });
});

apiRouter.post("/login", async (req, res, next) => {
  console.log("Login attempt");
  console.log(await queries.validateLogin(req.body.email, req.body.password));
  console.log(req.body);
  res.json({ token: "1234" });
});

apiRouter.post("/register", async (req, res, next) => {
  console.log(
    await queries.registerUser({
      email_new: req.body.email,
      password_new: req.body.password,
      name_new: req.body.name,
    })
  );
  res.status(69).end();
});

module.exports = apiRouter;
