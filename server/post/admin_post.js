/* admin_posts.js
 * Defines all the routes required for admin access
 */

const express = require("express"); // Importing express
const adminRouter = express.Router(); // Creating a router to handle requests
const server_functions = require("../server_functions"); // Importing server functions
const bookings_queries = require("../../database/schema_functions/booking_functions"); // Importing booking functions
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
adminRouter.get("/getAllCourts", async (req, res) => {
  try {
    const response = await courts_queries.getAllCourts(); // Getting all courts from database

    // If there is no response
    if (!response || response.error || !response.result) {
      return res
        .status(400)
        .json({ message: "Failed to retrieve courts", error: response.error });
    }

    return res
      .status(200)
      .json({ result: true, data: response.data, error: null }); // Sending all courts to client
  } catch (error) {
    return res.status(400).json({
      result: false,
      data: null,
      error: "Failed to fetch basic statistics",
    });
  }
});

/**
 * @brief Post request for obtaining all courts' statistics.
 *
 * @param None
 *
 * @return
 * - 200: Success in obtaining court statistics
 * - 500: Failed to fetch basic statistics
 */
adminRouter.post("/getBasicStatistics", async (req, res) => {
  try {
    const { data: allCourts } = await courts_queries.getAllCourts(); // Getting all courts from database
    const courtStatistics = []; // Array to store court statistics

    // For each court, get the number of bookings and total money made
    for (const court of allCourts) {
      const { data: bookingCount } =
        await bookings_queries.countAndSumBookingsByCourtID(court._id); // Get the number of bookings per court
      // Store the statistics in a variable
      const courtInfo = {
        name: court.court_name,
        bookings: bookingCount.count,
        money: bookingCount.totalCost,
      };
      courtStatistics.push(courtInfo); // Push the statistics to the array
    }
    res.json({ result: true, data: courtStatistics, error: null }); // Send the statistics to the client
  } catch (error) {
    console.error("Error fetching basic statistics:", error);
    res.status(500).json({
      result: false,
      data: null,
      error: "Failed to fetch basic statistics",
    });
  }
});

/**
 * @brief Post request for registering a new court.
 *
 * @param None
 *
 * @return
 * - 200: Successful court registration
 * - 500: Failed to register court
 */
adminRouter.post("/registerCourt", async (req, res) => {
  // Attempt to register a new court with the given information
  response = await courts_queries.registerCourt({
    name_new: req.body.courtName,
    price_new: req.body.price,
    address_new: req.body.address,
    longitude_new: req.body.longitude,
    latitude_new: req.body.latitude,
    area_new: req.body.area,
    type_new: req.body.type,
  });

  // If there is no response
  if (!response || response.error || !response.result) {
    res.status(500).json(response);
  }
  // Send the response back to the client
  res.status(200).json(response);
});

/**
 * @brief Post request for configuring a court.
 *
 * @param None
 *
 * @return
 * - 200: Successful configuration of court
 * - 400: Court not found.
 * - 500: Failed to configure court
 */
adminRouter.post(
  "/configCourts",
  server_functions.authenticateToken,
  async (req, res) => {
    const id = req.body.courtId; // Obtaining court ID of court chosen by the admin
    const name = req.body.name; // Obtaining the new name of the court chosen by the admin
    const price = req.body.price; // Obtaining the new price of the court chosen by the admin

    try {
      // Attempt to update the court with the given information using the court ID chosen by the admin.
      const response = await courts_queries.updateCourt(id, name, price);

      // If court doesn't exist
      if (!response.result) {
        return res.status(400).json({
          message: "No court found",
          data: {},
          error: response.error,
        });
      }

      // If court does exist
      return res.status(200).json({
        message: "Court Updated",
        data: response.data,
        error: null,
      });
    } catch (error_msg) {
      return res.status(500).json({
        message: "Failed to update court",
        data: {},
        error: error_msg,
      });
    }
  }
);

module.exports = adminRouter;
