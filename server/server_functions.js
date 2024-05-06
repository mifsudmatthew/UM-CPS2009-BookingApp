/* server_functions.js
 * Functions that are used in the routes of the server */

// Obtaining the node mailer module
const nodeMailer = require("nodemailer");
// JSON Web Tokens for autherization
const jwt = require("jsonwebtoken");

// Obtaining the database schema functions for user
const user_queries = require("../database/schema_functions/user_functions");

var accountPins = []; // Creating an array to store pins generated and their corresponding emails.

// Function to generate a new pin. By generating 4 random numbers (0-9) and concatenating them.
function getRandomPin() {
  let tmp = ""; // Creating an empty string
  for (let i = 0; i < 4; i++) {
    // Iterating 4 times
    digit = Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
    tmp += digit; // Concatenate the current digit to the string
  }
  // Return generated pin
  return tmp;
}

// Function to add an entry to the accountPins array with a  5 minute timer
function addPinEntry(email, pin) {
  // Parameters taken are the user email and the corresponding pin
  // Adding a new entry to the accountPins array with parameter data
  accountPins.push({ email: email, pin: pin });
  console.log(`accountPins:${accountPins}`);

  // Applying a timer which removes the entry 5 minutes after it is pushed on the array.
  setTimeout(() => {
    // Searching for index of the entry that require removal.
    let index = accountPins.findIndex(
      (entry) => entry.email === email && entry.pin === pin
    );
    // If entry is found
    if (index !== -1) {
      // Removing the entry at the index 'index'
      accountPins.splice(index, 1);
      console.log(
        "Entry with email " +
          email +
          " and pin " +
          pin +
          "removed after 5 minutes."
      );
    }
  }, 300000); // Setting timer to 5 minutes in milliseconds
}

// Function to send an email to user requesting a password reset.
async function sendPinByMail(user_email) {
  var generated_pin = getRandomPin(); // Generating a new pin

  // Variable storing all email details.
  const emailDetails = {
    from: "no-reply@servespot.com", // Address of account sending the email.
    to: user_email, // Email of the user requesting a reset.
    subject: "ServeSpot: Password Reset", // Subject of email.
    text: "Enter the code: " + generated_pin + " to reset your password.", // Email content.
  };

  // Creating a transporter with the details of the mail service being used.
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST, // Host is set to be changed from .env file
    port: 465,
    auth: {
      user: process.env.MAIL_USER, // Username is set to be changed from .env file
      pass: process.env.MAIL_PASS, // Password is set to be changed from .env file
    },
  });

  // Sending the email with the details created.
  let sentMessage = await transporter.sendMail(emailDetails);
  console.log("Email sent:", sentMessage.response);

  // Pushing the pin and corresponding email to 'accountPins' array
  addPinEntry(app_email, generated_pin);

  // Sending a response on success
  return { message: "Email sent successfully" };
}

// Function to send a confirmation to the user that the payment was successful.
async function sendPaymentSuccessMail(user_email, amount) {
  user_data = await user_queries.retrieveUser(user_email); // Obtaining data associated with the email inputted.

  if (user_data.result) {
    // Variable storing all email details.
    const emailDetails = {
      from: "no-reply@servespot.com", // Address of account sending the email.
      to: user_email, // Email of the user requesting a reset.
      subject: "Successful Account Top-Up: " + amount + " Added", // Subject of email.
      // Email body using details from the user's data retrieved.
      text:
        "Dear " +
        user_data.data.name +
        ",\n\nWe're pleased to inform you that your recent request to top up your ServeSpot account has been successfully processed.\n\nHere are the details of your transaction:\n\n Amount: " +
        amount +
        "\n\n New Balance: " +
        user_data.data.balance +
        ":00" +
        "\n\nYour account is now ready to use with the updated balance. We ensure that our platform is continuously updated to provide you with the best possible experience.\n\nThank you for choosing ServeSpot. We look forward to serving you again!\n\nBest Regards,\nServeSpot",
    };

    // Creating a transporter with the details of the mail service being used.
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST, // Host is set to be changed from .env file
      port: 465,
      auth: {
        user: process.env.MAIL_USER, // Username is set to be changed from .env file
        pass: process.env.MAIL_PASS, // Password is set to be changed from .env file
      },
    });

    // Sending the email with the details created.
    let sentMessage = await transporter.sendMail(emailDetails);
    console.log("Email sent:", sentMessage.response);

    // Sending a response on success
    return { message: "Email sent successfully" };
  } else {
    return { message: "Failed to retreive email" };
  }
}

// Function to send a confirmation to the user that the booking was successful.
async function sendBookingSuccessMail(user_email, court, date, hour, price) {
  user_data = await user_queries.retrieveUser(user_email); // Obtaining data associated with the email inputted.

  if (user_data.result) {
    // Variable storing all email details.
    const emailDetails = {
      from: "no-reply@servespot.com", // Address of account sending the email.
      to: user_email, // Email of the user requesting a reset.
      subject: "Successful Booking for " + court, // Subject of email.
      // Email body using details from the user's data retrieved.
      text:
        "Dear " +
        user_data.data.name +
        ",\n\nWe're pleased to inform you that your recent booking request has been successful.\n\nHere are the details of your booking:\n\n Court: " +
        court +
        "\n\n Date: " +
        date +
        "\n\n Time: " +
        hour +
        ":00" +
        "\n\n Price paid: €" +
        price +
        "\n\n\nThank you for choosing ServeSpot. We look forward to serving you again!\n\nBest Regards,\nServeSpot",
    };

    // Creating a transporter with the details of the mail service being used.
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST, // Host is set to be changed from .env file
      port: 465,
      auth: {
        user: process.env.MAIL_USER, // Username is set to be changed from .env file
        pass: process.env.MAIL_PASS, // Password is set to be changed from .env file
      },
    });

    // Sending the email with the details created.
    let sentMessage = await transporter.sendMail(emailDetails);
    console.log("Email sent:", sentMessage.response);

    // Sending a response on success
    return { message: "Email sent successfully" };
  } else {
    return { message: "Failed to retreive email" };
  }
}

// Function to send a confirmation to the user that the booking was cancelled.
async function sendCancellationSuccessMail(
  user_email,
  court,
  date,
  hour,
  price
) {
  user_data = await user_queries.retrieveUser(user_email); // Obtaining data associated with the email inputted.

  if (user_data.result) {
    // Variable storing all email details.
    const emailDetails = {
      from: "no-reply@servespot.com", // Address of account sending the email.
      to: user_email, // This should be changed to email of the user requesting a reset.
      subject: "Successful Cancellation for " + court, // Subject of email.
      // Email body using details from the user's data retrieved.
      text:
        "Dear " +
        user_data.data.name +
        ",\n\nWe would like to inform you that the following booking has been cancelled:\n\n Court: " +
        court +
        "\n\n Date: " +
        date +
        "\n\n Time: " +
        hour +
        ":00" +
        "\n\n Amount refunded: €" +
        price +
        "\n\n\nThank you for choosing ServeSpot. We look forward to serving you again!\n\nBest Regards,\nServeSpot",
    };

    // Creating a transporter with the details of the mail service being used.
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST, // Host is set to be changed from .env file
      port: 465,
      auth: {
        user: process.env.MAIL_USER, // Username is set to be changed from .env file
        pass: process.env.MAIL_PASS, // Password is set to be changed from .env file
      },
    });

    // Sending the email with the details created.
    let sentMessage = await transporter.sendMail(emailDetails);
    console.log("Email sent:", sentMessage.response);

    // Sending a response on success
    return { message: "Email sent successfully" };
  } else {
    return { message: "Failed to retreive email" };
  }
}

// Function to validate the user's token.
function authenticateToken(req, res, next) {
  // Obtaining the authorization header from the request.
  const authHeader = req.headers.authorization;

  // Check if header is exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "No authorization attached" });
  }

  // When token exists
  const token = authHeader.split(" ")[1];

  if (!token) {
    // When token is blank
    return res.status(403).json({ error: "Unauthorized: No token supplied" });
  }

  // Verifying the token with the secret key
  jwt.verify(token, process.env.JWT_ACCESS, (err, decoded) => {
    if (err) return res.status(403).json({ error: `Token is invalid ${err}` });
    req.user = decoded;
    next();
  });
}

// Function to return a new token for the user based on the email.
async function getUpdatedToken(email) {
  // Check if email is not supplied
  if (email == undefined || email == null)
    return { result: false, data: {}, error: "Email not supplied" };

  try {
    const user = await user_queries.retrieveUser(email); // Retrieve user data from the database

    // Check if user exists
    if (!user.result) return { result: false, data: {}, error: user.error };

    // Create a new payload with the user's data
    const newPayload = {
      id: user.data._id,
      email: user.data.email,
      name: user.data.name,
      balance: user.data.balance,
      admin: user.data.admin,
    };

    // Generate a new token with the new payload
    const newToken = generateAccessToken(newPayload);

    return { result: true, data: { accesstoken: newToken }, error: null };
  } catch (error) {
    console.log("----------------------------------");
    console.log(error);
    return { result: false, data: {}, error: error };
  }
}

// Function to generate a new access token.
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS);
}

// Not used
function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH);
}

module.exports = {
  accountPins,
  sendPinByMail,
  sendBookingSuccessMail,
  sendCancellationSuccessMail,
  sendPaymentSuccessMail,
  authenticateToken,
  getToken,
  getUpdatedToken,
  generateAccessToken,
  generateRefreshToken,
};
