const express = require("express");
const adminRouter = express.Router();
const server_functions = require("../server_functions");
const bookings_quieries = require("../../database/schema_functions/booking_functions");
const courts_quieries = require("../../database/schema_functions/court_functions");
const user_quieries = require("../../database/schema_functions/user_functions");

adminRouter.post("/registerCourt", async (req, res) => {
    console.log(req.body);
    response = await courts_quieries.registerCourt({
        name_new        : req.body.courtName,
        price_new       : req.body.price,
        address_new     : req.body.address,
        longitude_new   : req.body.longitude,
        latitude_new    : req.body.latitude,
        area_new        : req.body.area,
        type_new        : req.body.type,
    });
    res.json(response);

});
module.exports = adminRouter;