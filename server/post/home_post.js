/**
 * @file home_post.js
 * @desc Handles all post requests for home page
 */

// Importing express
const express = require("express");
// Creating a router to handle requests
const home_router = express.Router();
// Importing court functions
const courts_queries = require("../../database/schema_functions/court_functions");

/**
 * Post request for retrieving all courts.
 * This route retrieves all courts from the database.
 * @category Back-end
 * @param None
 * @return
 * - 200: Success in retrieving all courts
 * - 500: Failed to retrieve all courts
 */
home_router.post("/getAllCourts", async (_req, res) => {
  // Getting all courts from database
  const response = await courts_queries.getAllCourts();

  // If there is no response
  if (!response.result) {
    return res.status(500).json({
      result: false,
      data: null,
      error: "Failed to retrieve all courts",
    });
  }

  // Sending all courts to client
  return res
    .status(200)
    .json({ result: true, data: response.data, error: null });
});

module.exports = home_router;
