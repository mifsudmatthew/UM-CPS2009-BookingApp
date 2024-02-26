require("dotenv").config(); // Allowing files to use .env configurations
const path = require("path"); // Obtaining the path module
const express = require("express"); // Obtaining express module
const mongoose = require("./database/mongoose"); // Running the database
const db = require("./database/database_functions");
//db.saveTestCase()

// Defining PORT of the server to listen on, if PORT is not defined in .env then it will listen on 3001
const PORT = process.env.PORT || 3001;

// Creating an ExpressJS application, by calling the variable express as a function.
const app = express();

// Parsing incoming JSON requests and placing parsed data in req.body
app.use(express.json());

// Have Node serve static files located in the client/build directory when a matching route is requested
app.use(express.static(path.resolve(__dirname, "client/build")));

// Request Handling
// Handle POST requests to /api route
app.route("/api/booking").post((req, res) => {
  db.saveTestCase();
  console.log("Booking request has been received!");
  res.json({ message: "Hello from server!" });
});

app.route("/api/login").post((req, res) => {
    console.log("Login attempt");
});

app.route("/api/register").post((req, res) => {
    console.log("Register attempt");
});


// All other GET requests not handled before will return our React app

app.route("/").get((req, res, next) => {
    next();
    console.log("Connected to home page");
});

app.route("/booking").get((req, res) => {
    console.log("Connected to booking page");
});

app.route("/account").get((req, res) => {
    console.log("Connected to account page");
});

app.route("/account/reset").get((req, res) => {
    console.log("Connected to reset page");
});

app.route("/account/profile").get((req, res) => {
    console.log("Connected to profile page");
});

app.route("/register").get((req, res) => {
    console.log("Connected to register page");
});

app.route("/login").get((req, res) => {
    console.log("Connected to login page");
});

app.route("*").get((req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

// Listen on specified port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
