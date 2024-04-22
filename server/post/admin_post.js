const express = require("express");
const adminRouter = express.Router();
const server_functions = require("../server_functions");
const bookings_quieries = require("../../database/schema_functions/booking_functions");
const courts_quieries = require("../../database/schema_functions/court_functions");
const user_quieries = require("../../database/schema_functions/user_functions");

adminRouter.post("/registerCourt", async (req, res) => {
  courts_quieries.registerCourt();
});

adminRouter.post(
  "/configCourts",
  server_functions.authenticateToken,
  async (req, res) => {
    const id = req.body.courtid;
    const name = req.body.name;
    const price = req.body.price;

    try {
      // Search for court by id
      const response = await courts_quieries.updateCourt(id, name, price);

      // When court doesn't exist
      if (!response.result) {
        return res
          .status(400)
          .json({ message: "No court found", error: response.error });
      }

      // When court does exist
      return res.status(200).json({
        message: "Court Updated",
        data: { ...response.data },
        error: null,
      });
    } catch (error_msg) {
      return res
        .status(400)
        .json({ message: "Failed to update court", error: error_msg });
    }
  }
);
