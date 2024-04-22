const express = require("express");
const adminRouter = express.Router();
const server_functions = require("../server_functions");
const bookings_quieries = require("../../database/schema_functions/booking_functions");
const courts_quieries = require("../../database/schema_functions/court_functions");
const user_quieries = require("../../database/schema_functions/user_functions");

adminRouter.post("/registerCourt", async (req, res) => {
  console.log(req.body);
  response = await courts_quieries.registerCourt({
    name_new: req.body.courtName,
    price_new: req.body.price,
    address_new: req.body.address,
    longitude_new: req.body.longitude,
    latitude_new: req.body.latitude,
    area_new: req.body.area,
    type_new: req.body.type,
  });
  res.json(response);
});

adminRouter.get("/getAllCourts", async (req, res) => {
  try {
    const response = await courts_quieries.getAllCourts();

    if (!response.result) {
      return res
        .status(400)
        .json({ message: "Failed to retrieve courts", error: response.error });
    }

    return res
      .status(200)
      .json({ result: true, data: response.data, error: null });
  } catch (error) {
    return res.status(400).json({
      result: false,
      data: null,
      error: "Failed to fetch basic statistics",
    });
  }
});

adminRouter.post("/getBasicStatistics", async (req, res) => {
  try {
    console.log("----------------------------------------------");
    const { data: allCourts } = await courts_quieries.getAllCourts();
    const courtStatistics = [];

    console.log(allCourts);

    for (const court of allCourts) {
      const { data: bookingCount } =
        await bookings_quieries.countBookingsByCourtID(court._id);
      const totalProfit = bookingCount * court.price;
      const courtInfo = {
        name: court.court_name,
        bookings: bookingCount,
        money: totalProfit,
      };
      courtStatistics.push(courtInfo);
    }

    res.json({ result: true, data: courtStatistics, error: null });
  } catch (error) {
    console.error("Error fetching basic statistics:", error);
    res.status(500).json({
      result: false,
      data: null,
      error: "Failed to fetch basic statistics",
    });
  }
});

adminRouter.post(
  "/configCourts",
  server_functions.authenticateToken,
  async (req, res) => {
    const id = req.body.courtId;
    const name = req.body.name;
    const price = req.body.price;

    try {
      // Search for court by id
      const response = await courts_quieries.updateCourt(id, name, price);

      // When court doesn't exist
      if (!response.result) {
        return res.status(400).json({
          message: "No court found",
          data: {},
          error: response.error,
        });
      }

      // When court does exist
      return res.status(200).json({
        message: "Court Updated",
        data: response.data,
        error: null,
      });
    } catch (error_msg) {
      return res.status(400).json({
        message: "Failed to update court",
        data: {},
        error: error_msg,
      });
    }
  }
);

module.exports = adminRouter;
