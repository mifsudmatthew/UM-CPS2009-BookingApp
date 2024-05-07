const express = require("express"); // Importing express
const stripe = require("stripe")(process.env.STRIPE_KEY); // Importing stripe
const payment_router = express.Router(); // Creating a router to handle requests
const user_queries = require("../../database/schema_functions/user_functions"); // Importing user functions
const stripe_queries = require("../../database/schema_functions/stripe_functions"); // Importing stripe functions
const server_functions = require("../server_functions"); // Importing server functions

/**
 * @brief Post request for top-up button
 *
 * Creates a session and sends the user to that stripe generated session.
 * After the checkout session is done the user is sent back to the top up page
 * together with the session id.
 *
 * @param None
 *
 * @return
 * - 200: Success in Sending User to Stripe Session
 * - 500: Failed to Create Stripe Session
 */
payment_router.post(
  "/topup",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const amount = req.body.amount; // Obtaining amount chosen by user to top-up.
      // Creating a new stripe session
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
      console.error("Error creating checkout session");
      return res.status(500).send({ error: "Error creating checkout session" });
    }
  }
);
/**
 * @brief Post request after returning to /topup from session (Success)
 *
 * Validates session id to check if payment was successful.
 * Makes use of database in order to hold a list of traversed payments.
 * Makes sure session is not used twice.
 * Adds session to Database.
 *
 * @param None
 *
 * @return
 * - 200: Success in making payment or failed payment.
 * - 500: Failed to handle successful payment (Possible Database Error).
 */
payment_router.post(
  "/success",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const session_id = req.body.session_id; // Obtaining session id.
      const email = req.user.email; // Obtaining email from user.
      const session = await stripe.checkout.sessions.retrieve(session_id); // Retrieving session from stripe.

      // ------------------ Query to see if session exists in database
      result_session = await stripe_queries.retrieveStripe(session_id);

      // ------------------ Check if payment is successful && session is not duplicated
      if (session.payment_status === "paid" && result_session.result == false) {
        console.log("Successfull Payment");
        actual_amount = session.amount_total / 100;

        // ------------------ Add new Session
        stripe_queries.registerStripe({
          session_id: session_id,
          email_new: email,
          amount_new: actual_amount,
        });

        // ------------------ Update Balance
        await user_queries.updateUserBalance(email, actual_amount);
        await server_functions.sendPaymentSuccessMail(email, actual_amount);
        const user = await user_queries.retrieveUser(email);
        const userData = {
          _id: user.data._id,
          email: user.data.email,
          name: user.data.name,
          admin: user.data.admin,
          balance: user.data.balance,
        };
        const accessToken = server_functions.generateAccessToken(userData);

        return res.json({
          result: true,
          data: { accessToken: accessToken },
          error: null,
        });
        // ------------------ Payment Not Successfull
      } else {
        console.log("Failed Payment");
        return res.status(400).json({
          result: false,
          data: null,
          error: "Failed Payment",
        });
      }
    } catch (error) {
      console.error(`Error handling successful payment ${error}`);
      return res.status(500).json({
        result: false,
        data: null,
        error: "Failed to handle successful payment",
      });
    }
  }
);

module.exports = payment_router;
