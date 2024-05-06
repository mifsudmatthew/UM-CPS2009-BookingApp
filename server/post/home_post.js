const express = require("express"); // Importing express
const home_router = express.Router(); // Creating a router to handle requests
const courts_queries = require("../../database/schema_functions/court_functions"); // Importing court functions

/**
 * @brief Post request for retrieving all courts.
 *
 * This route retrieves all courts from the database.
 *
 * @param None
 *
 * @return
 * - 200: Success in retrieving all courts
 * - 400: Failed to retrieve all courts
 */

home_router.post("/getAllCourts", async (req, res) => {
  response = await courts_queries.getAllCourts(); // Getting all courts from database
  // If there is no response
  if (!response || response.error || !response.result) {
    return res.status(400).send({ error: "Failed to retrieve all courts" });
  }
  res.status(200).json(response); // Sending all courts to client
});

module.exports = home_router;
