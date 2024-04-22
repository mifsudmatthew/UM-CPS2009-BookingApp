const express = require("express");
const adminRouter = express.Router();
const server_functions = require("../server_functions");
const bookings_quieries = require("../../database/schema_functions/booking_functions");
const courts_quieries = require("../../database/schema_functions/court_functions");
const user_quieries = require("../../database/schema_functions/user_functions");

adminRouter.post(
    "/registerCourt",
    async (req, res) => {
        courts_quieries.registerCourt()
    }
);

