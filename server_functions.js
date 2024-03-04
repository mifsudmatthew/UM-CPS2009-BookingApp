const nodeMailer = require("nodemailer"); // Obtaining the node mailer module
const jwt = require("jsonwebtoken");

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
  console.log(accountPins);

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
async function sendPinByMail(res) {
  var app_email = "no.reply.servespot@gmail.com" // Address of account requesting pin
  var generated_pin = getRandomPin(); // Generating a new pin

  // Variable storing all email details.
  const emailDetails = {
    from: "no-reply@servespot.com", // Address of account sending the email.
    to: app_email, // This should be changed to email of the user requesting a reset.
    subject: "ServeSpot: Password Reset", // Subject of email.
    text: "Enter the code: " + generated_pin + " to reset your password.", // Email content.
  };

  // Attempting to send the email to the user.
  try {
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
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Error sending email");
  }
}

function authenticate(req, res, next) {
  const authHeader = req.headers.autherization;

  // When autherization header is blank
  if (!authHeader) return res.status(403).send("Unautherized").end();
  // When token exists
  const token = authHeader.split(" ")[1];
  // Verify
  jwt.verify(token, process.env.JWT_ACCESS, (err, decoded) => {
    if (err) return res.status(403).send("Token").end();

    console.log(decoded);
    next();
  });
}

module.exports = {
  accountPins,
  sendPinByMail,
  authenticate,
};
