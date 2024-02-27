/* server.js
 * Node.js backend application entry point
 * Is the start of the express server
 */

// Allowing files to use .env configurations
require("dotenv").config();
// Obtaining the path module
const path = require("path");
// Obtaining express module
const express = require("express");

const apiRouter = require("./api");

// Defining PORT of the server to listen on, if PORT is not defined in .env then it will listen on 3001
const PORT = process.env.PORT || 3001;
// Creating an ExpressJS application, by calling the variable express as a function.
const app = express();
// Have Node serve static files located in the client/build directory when a matching route is requested
app.use(express.static(path.resolve(__dirname, "client/build")));
// Parsing incoming JSON requests and placing parsed data in req.body
app.use(express.json());

// Listen on specified port
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// Add api route
app.use("/api", apiRouter);

// All other routes lead to static index.html
app.route("*").get((req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});
