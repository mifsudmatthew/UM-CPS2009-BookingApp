const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const payment_router = express.Router();
const user_queries = require("../../database/schema_functions/user_functions");
const stripe_queries = require("../../database/schema_functions/stripe_functions");
const server_functions = require("../server_functions");

/** ==================================== Topup =====================================================
 * ------------- post request for top-up button
 * Creates a session and sends the user to that stripe generated session
 * After the checkout session is done the user is sent to /topup
 * together with the session id
 */
payment_router.post(
  "/topup",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const amount = req.body.amount;
      const session = await stripe.checkout.sessions.create({
        // ------------------ Item to be bought in this case top-up
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: { name: "Balance Top-Up" },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `http://${req.headers.host}/profile/topup?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://${req.headers.host}/profile/topup?session_id={CHECKOUT_SESSION_ID}`,
      });

      // ------------------ Send user to session
      res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return res.status(500).send({ error: "Error creating checkout session" });
    }
  }
);
/** ==================================== SuccessFull Payment ======================================
 * ------------- post request after returning to /topup from session
 * Validates session id to check if payment was succesfull.
 * Makes use of database in order to hold a list of traversed payments.
 * Makes sure session is not used twice.
 * Adds session to Database.
 */
payment_router.post(
  "/success",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const session_id = req.body;
      const email = req.user.email;
      const session = await stripe.checkout.sessions.retrieve(session_id);

      // ------------------ Query to see if session exists in database
      result_session = await stripe_queries.retrieveStripe(session_id);

      // ------------------ Check if payment is successful && session is not duplicated
      if (session.payment_status === "paid" && result_session.result == false) {
        console.log("Successfull Payment");

        // ------------------ Add new Session
        stripe_queries.registerStripe({
          session_id: session_id,
          email_new: email,
          amount_new: session.amount_total / 100,
        });

        // ------------------ Update Balance
        user_queries.updateUserBalance(email, session.amount_total / 100);

        return res.json({ success: true });

        // ------------------ Payment Not Successfull
      } else {
        console.log("Failed Payment");

        return res.json({ success: false });
      }
    } catch (error) {
      console.error("Error handling successful payment:", error);
      return res
        .status(500)
        .json({ error: "Failed to handle successful payment" });
    }
  }
);

module.exports = payment_router;
