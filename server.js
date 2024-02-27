require("dotenv").config(); // Allowing files to use .env configurations
const path = require("path"); // Obtaining the path module
const express = require("express"); // Obtaining express module
const apiRouter = require("./api");

// Defining PORT of the server to listen on, if PORT is not defined in .env then it will listen on 3001
const PORT = process.env.PORT || 3001;
// Creating an ExpressJS application, by calling the variable express as a function.
const app = express();
// Parsing incoming JSON requests and placing parsed data in req.body
app.use(express.json());
// Have Node serve static files located in the client/build directory when a matching route is requested
app.use(express.static(path.resolve(__dirname, "client/build")));

// Listen on specified port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Add api route
app.use("/api", apiRouter);

app.route("*").get((req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});
