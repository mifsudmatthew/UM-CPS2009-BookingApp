const express = require("express");
const apiRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

// Authentication
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const mongoose = require("./database/mongoose"); // Running the database
const db = require("./database/test_functions");
const queries = require("./database/schema_functions/user_functions");
const sf = require("./server_functions");

let currentUserEmail = ""

// Log the current URL that is accessed
apiRouter.use((req, _res, next) => {
  console.log(`API on ${req.url}`);
  next();
});

apiRouter.post("/authenticate", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (true) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(user.data, process.env.JWT_ACCESS, {
      expiresIn: "15m",
    });
    res.json({ accessToken: accessToken });
  });
});

apiRouter.post("/reset", (req,res) => {
  console.log("Connected to reset page");
  sf.sendPinByMail(currentUserEmail,res);
});

apiRouter.post("/booking", sf.authenticate, (req, res, next) => {
  console.log("Booking request has been received!");
  db.saveTestCase();
  res.json({ message: "Booking added" });
});

apiRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  currentUserEmail = email;
  const password = req.body.password;
  const dbUser = await queries.retrieveUser(email);

  // Check if email exists
  if (!dbUser.result) {
    // Email no exist
    return res.status(400).send("Email not in use").end();
  }

  // Email Exists
  try {
    if (await bcrypt.compare(password, dbUser.data.password)) {
      const accessToken = jwt.sign(
        { email: dbUser.data.email },
        process.env.JWT_ACCESS,
        {
          expiresIn: "15m",
        }
      );
      const refreshToken = jwt.sign(
        { email: dbUser.data.email },
        process.env.JWT_REFRESH
      );

      res.json({
        id: dbUser.data._id,
        name: dbUser.data.name,
        email: dbUser.data.email,
        password: "",
        balance: dbUser.data.balance,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(401).json({ message: "Not Allowed" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "USERSome kind of error in login", error: err });
  }
});

apiRouter.post("/changepassword", async (req, res) => {
  for (i = 0; i < sf.accountPins.length; i++) {
    if (
      sf.accountPins[i].pin == req.body.pin &&
      sf.accountPins[i].email == currentUserEmail
    ) {
      console.log(
        await queries.resetPassword(currentUserEmail, await bcrypt.hash(req.body.password, 10))
        
      );
      res.json({message:"Success"})
    }
  }
  res.status(400).json({message:"Fail"})
});

apiRouter.post("/register", async (req, res) => {
  const email = req.body.email;

  // Check if email exists
  if (await queries.retrieveUser(email).result) {
    // Duplicate email
    return res.status(401).send("Email already in use").end();
  }
  // Email no exists

  const name = req.body.name;
  const password = await bcrypt.hash(req.body.password, 10);
  console.log(password);
  // Register user on DB
  const response = await queries.registerUser({
    email_new: email,
    password_new: password,
    name_new: name,
  });

  if (response.result) {
    // User added to DB
    res.status(200).send("User Registered").end();
  } else {
    // Failed to add User to DB
    res.status(401).send(response.error).end();
  }
});

apiRouter.post("/topup", async (req, res) => {
  const amount = req.body.amount;
  const url = req.headers.host;
  console.log(url)
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Balance Top-Up',
            },
            unit_amount: amount * 100, 
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `https://${url}/api/success?session_id={CHECKOUT_SESSION_ID}&${sf.getToken(req)}`,
      cancel_url: `https://${url}/api/cancel?session_id={CHECKOUT_SESSION_ID}&${sf.getToken(req)}`,
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).send(/* Response when there's an error */);
  }
});
// Endpoint to handle successful payment
apiRouter.get("/success", async (req, res) => {
  
  try {
    // Extract the session ID from the query parameters
    const sessionId = req.query.session_id;

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    email = sf.getEmail(req.query.token)
    console.log("EMAIL: "+email)
    // Check if payment is successful
    console.log(session.payment_status);
    if (session.payment_status === 'paid') {
      // Update the balance only if payment is successful
      queries.updateUserBalance(email, session.amount_total / 100); // Convert amount to dollars
    }

    // Redirect or respond as needed
    res.redirect(`http://${req.header.host}/profile/topup`); // Redirect to a success page
  } catch (error) {
    console.error('Error handling successful payment:', error);
    res.status(500).json({ error: 'Failed to handle successful payment' });
  }
});
// Endpoint to handle successful payment
apiRouter.get("/cancel", async (req, res) => {
  try {

    // Redirect or respond as needed
    res.redirect(`http://${req.header.host}/profile/topup`); // Redirect to a success page
  } catch (error) {
    console.error('Error handling successful payment:', error);
    res.status(500).json({ error: 'Failed to handle successful payment' });
  }
});
module.exports = apiRouter;