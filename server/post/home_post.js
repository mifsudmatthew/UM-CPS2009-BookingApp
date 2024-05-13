/**
 * @file home_post.js
 * @desc Handles all post requests for home page
 */
const express = require("express"); // Importing express
const home_router = express.Router(); // Creating a router to handle requests
const courts_queries = require("../../database/schema_functions/court_functions"); // Importing court functions

/**
 * Post request for retrieving all courts.
 *
 * This route retrieves all courts from the database.
 *
 * @category Back-end
 *
 * @param None
 *
 * @return
 * - 200: Success in retrieving all courts
 * - 500: Failed to retrieve all courts
 */

home_router.post("/getAllCourts", async (req, res) => {
  response = await courts_queries.getAllCourts(); // Getting all courts from database
  // If there is no response
  if (!response || response.error || !response.result) {
    return res.status(500).send({ error: "Failed to retrieve all courts" });
  }
  res.json(response); // Sending all courts to client
});

module.exports = home_router;
