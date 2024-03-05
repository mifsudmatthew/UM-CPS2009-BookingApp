/* api.js
 * Holds the routes that fall under '/api/*' */

const express = require("express");
const apiRouter = express.Router();

// Authentication
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Payment
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Database
const mongoose = require("./database/mongoose"); // Running the database
const db = require("./database/test_functions");
const queries = require("./database/schema_functions/user_functions");

// Util functions
const sf = require("./server_functions");

let currentUserEmail = "";

// Log the current URL that is accessed
apiRouter.use((req, _res, next) => {
  console.log(`API on ${req.url}`);
  next();
});

// Testing
apiRouter.post("/test", sf.authenticateToken, (req, res) => {
  res.json();
});

// To refresh the token
apiRouter.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    // Check if refresh token is sent in request
    return res.status(401).json({ error: "No refresh token attached" });
  }

  // Verify refreshToken
  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
    if (err) {
      // When error occurs
      return res.sendStatus(403).json({ error: "Invalid refresh token" });
    }

    // Generate the two new tokens
    const accessToken = sf.generateAccessToken(user);
    const newRefreshToken = sf.generateRefreshToken(user);

    // Send tokens back
    res.json({ accessToken: accessToken, refreshToken: newRefreshToken });
  });
});

apiRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // TEMP
  // Temporary gloabl email for testing
  currentUserEmail = email;
  // TEMP

  try {
    const dbUser = await queries.retrieveUser(email);

    // Check if email exists
    if (!dbUser.result) {
      // Email no exist
      return res.status(400).send("Email not in use");
    }

    // Email exists
    if (await bcrypt.compare(password, dbUser.data.password)) {
      const user = {
        id: dbUser.data._id,
        email: dbUser.data.email,
        name: dbUser.data.name,
        balance: dbUser.data.balance,
      };

      const accessToken = sf.generateAccessToken(user);
      const refreshToken = sf.generateRefreshToken(user);

      res.json({
        ...user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(400).json({ error: "Passwords do not match" });
    }
  } catch (err) {
    return res.status(500).json({ error: `Failed to login user: ${err}` });
  }
});

apiRouter.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const dbUser = await queries.retrieveUser(email);

    // Check if email exists
    if (dbUser.result) {
      // Email no exist
      return res.status(400).send("Email already in use");
    }

    // Email exists
    const hashedPassword = await bcrypt.hash(password, 10);

    /* No need to check result of registerUser as it throws error now */

    // Register user on DB
    await queries.registerUser({
      name_new: name,
      email_new: email,
      password_new: hashedPassword,
    });

    // User added to DB
    return res.status(200).json({ message: "User successfully registered" });
  } catch (err) {
    return res.status(500).json({ error: `Failed to register user: ${err}` });
  }
});

apiRouter.post("/reset", sf.authenticateToken, (req, res) => {
  console.log("Connected to reset page");
  sf.sendPinByMail(req.body.user.email, res);
});

apiRouter.post("/booking", sf.authenticateToken, (req, res, next) => {
  console.log("Booking request has been received!");
  db.saveTestCase();
  res.json({ message: "Booking added" });
});

apiRouter.post("/changepassword", async (req, res) => {
  for (i = 0; i < sf.accountPins.length; i++) {
    if (
      sf.accountPins[i].pin == req.body.pin &&
      sf.accountPins[i].email == currentUserEmail
    ) {
      console.log(
        await queries.resetPassword(
          currentUserEmail,
          await bcrypt.hash(req.body.password, 10)
        )
      );
      res.json({ message: "Success" });
    }
  }
  res.status(400).json({ message: "Fail" });
});

apiRouter.post("/topup", async (req, res) => {
  const amount = req.body.amount;
  const url = req.headers.host;
  console.log(url);
  try {
    const token = sf.getToken(req); // Retrieve token
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Balance Top-Up",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `https:/${req.header.host}/profile/topup?success=true`, // Include token in success_url
      cancel_url: `https://${req.header.host}/profile/topup?success=false`, // Include token in cancel_url
      payment_intent_data: {
        metadata: {
          webhook_endpoint: `https://${url}/webhook`,
          token: token, // Pass token as metadata
        },
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).send(/* Response when there's an error */);
  }
});

// Endpoint to handle webhook events from Stripe
apiRouter.post("/webhook", async (req, res) => {
  const event = req.body;
  console.log("Send Help Please")
  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerId = session.customer;
    const amount = session.amount_total / 100; // Convert amount to dollars
    const token = session.payment_intent.metadata.token; // Retrieve token from metadata

    // Update user balance or perform other actions based on successful payment
    queries.updateUserBalance(customerId, amount, token);
  }

  res.status(200).end();
});
