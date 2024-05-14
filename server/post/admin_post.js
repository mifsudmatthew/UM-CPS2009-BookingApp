/**
 * @file admin_posts.js
 * @desc Defines all the routes required for admin access
 */

const express = require("express"); // Importing express
const adminRouter = express.Router(); // Creating a router to handle requests
const sf = require("../server_functions"); // Importing server functions
const bookings_queries = require("../../database/schema_functions/booking_functions"); // Importing booking functions
const courts_queries = require("../../database/schema_functions/court_functions"); // Importing court functions

/**
 * Post request for retrieving all courts.
 *
 * This route retrieves all courts from the database.
 * @category Back-end
 * @param None
 * @return
 * - 200: Success in retrieving all courts
 * - 400: Failed to retrieve all courts
 */
adminRouter.get("/getAllCourts", async (_req, res) => {
  const response = await courts_queries.getAllCourts(); // Getting all courts from database

  // Response success
  if (response.result) {
    return res
      .status(200)
      .json({ result: true, data: response.data, error: null });
  }

  // Response Failure
  return res.status(400).json({
    result: false,
    data: null,
    error: `Failed to retrieve all courts: ${response.error}`,
  });
});

/**
 * Post request for obtaining all courts' statistics.
 * @category Back-end
 * @param None
 * @return
 * - 200: Success in obtaining court statistics
 * - 500: Failed to fetch basic statistics
 */
adminRouter.post(
  "/getBasicStatistics",
  sf.authenticateToken,
  async (req, res) => {
    // Getting all courts from database
    const allCourtsResponse = await courts_queries.getAllCourts();
    const allCourts = allCourtsResponse.data;
    const courtStatistics = []; // Array to store court statistics

    // Response Failure
    if (!allCourtsResponse.result) {
      return res.status(400).json({
        result: false,
        data: null,
        error: `Failed to retrieve all courts: ${allCourtsResponse.error}`,
      });
    }

    // For each court, get the number of bookings and total money made
    for (const court of allCourts) {
      // Get the number of bookings per court
      const bookingCountResponse =
        await bookings_queries.countAndSumBookingsByCourtID(court._id);

      if (!bookingCountResponse.result) {
        return res.status(400).json({
          result: false,
          data: null,
          error: `Failed to retrieve sum for court_id: ${court._id}`,
        });
      }

      // Store the statistics in a variable
      const courtInfo = {
        name: court.court_name,
        bookings: bookingCount.data.count,
        money: bookingCount.data.totalCost,
      };

      // Push the statistics to the array
      courtStatistics.push(courtInfo);
    }

    // Send the statistics to the client
    return res
      .status(200)
      .json({ result: true, data: courtStatistics, error: null });
  }
);

/**
 * Post request for registering a new court.
 * @category Back-end
 * @param None
 * @return
 * - 200: Successful court registration
 * - 500: Failed to register court
 */
adminRouter.post("/registerCourt", async (req, res) => {
  // Attempt to register a new court with the given information
  const response = await courts_queries.registerCourt({
    name_new: req.body.courtName,
    price_new: req.body.price,
    address_new: req.body.address,
    longitude_new: req.body.longitude,
    latitude_new: req.body.latitude,
    area_new: req.body.area,
    type_new: req.body.type,
  });

  // If there is no response
  if (!response.result) {
    return res
      .status(400)
      .json({ result: false, data: null, error: `${response.error}` });
  }

  // Send the response back to the client
  return res
    .status(200)
    .json({ result: true, data: response.data, error: null });
});

/**
 * Post request for configuring a court.
 * @category Back-end
 * @param None
 * @return
 * - 200: Successful configuration of court
 * - 400: Court not found.
 * - 500: Failed to configure court
 */
adminRouter.post("/configCourts", sf.authenticateToken, async (req, res) => {
  // Obtaining court ID of court chosen by the admin
  const id = req.body.courtId;
  // Obtaining the new name of the court chosen by the admin
  const name = req.body.name;
  // Obtaining the new price of the court chosen by the admin
  const price = req.body.price;

  // Attempt to update the court with the given information using the court ID chosen by the admin.
  const response = await courts_queries.updateCourt(id, name, price);

  // If court doesn't exist
  if (!response.result) {
    return res.status(400).json({
      result: false,
      data: null,
      error: response.error,
    });
  }

  // If court does exist
  return res.status(200).json({
    result: true,
    data: response.data,
    error: null,
  });
});

module.exports = adminRouter;
