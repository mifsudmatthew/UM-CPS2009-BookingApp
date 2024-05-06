/* server.js
 * Node.js backend application entry point
 * Is the start of the express server
 */

// Allowing files to use .env configurations
require("dotenv").config();
// Running the database
require("./database/mongoose");
// Used to get correct absolute path
const path = require("path");
// Express server
const express = require("express");
// API Router
const apiRouter = require("./server/api");
const paymentRouter = require("./server/post/payments_post");
const bookingRounter = require("./server/post/bookings_post");
const adminRouter = require("./server/post/admin_post");
const homeRouter = require("./server/post/home_post");
// CORS because pain
const cors = require("cors");
// Compression incoming and outgoing requests
const compression = require("compression");

// Creating an ExpressJS application, by calling the variable express as a function.
const app = express();

// Defining PORT of the server to listen on
// if PORT is not defined in .env then it will listen on 3001
const PORT = process.env.PORT || 3001;

/* MIDDLEWARE  */

// Static files located in the 'client/build' directory
const static_files = path.resolve(__dirname, "client/dist");

// Cross origin requests
app.use(cors());
// Compressing In/Out requests
app.use(compression());
// Parsing incoming JSON requests and placing parsed data in req.body
app.use(express.json());
// Node knows which directory to serve static files from
app.use(express.static(static_files));

/* ROUTES */

// Api routes
app.use("/api", apiRouter);
app.use("/api", paymentRouter);
app.use("/api", bookingRounter);
app.use("/api", adminRouter);
app.use("/api", homeRouter);

// Serve the main app on all other routes
app.route("*").get((_req, res) => {
  res.sendFile(path.resolve(static_files, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
