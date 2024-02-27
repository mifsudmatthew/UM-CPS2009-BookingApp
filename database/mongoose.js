const mongoose = require("mongoose"); // Obtaining the mongoose module

// Configuring mongoose such that if you attempt to query a property that is not defined
// in the schema, an error is thrown
mongoose.set("strictQuery", true);

/** ============================================ Port Setup =======================
 * This makes use of the .env file to get the mongodb
 * links and information
 */

//--------------------------- Url Configuration
const mongoUrl =
  `mongodb+srv://` +
  `${process.env.USER}` +
  `:` +
  `${process.env.PASSWORD}` +
  `@production.vhjvw6m.mongodb.net/mainDB?retryWrites=true&w=majority`;
//--------------------------- Flags and Options Configuration

//============================================ Connection Setup =================
mongoose
  .connect(mongoUrl)

  //---------------------------- Successful Creation
  .then(() => {
    console.log("Mongoose Successfully Connected");
  })

  //---------------------------- Error Handling
  .catch((err) => {
    if (err.name === "MongooseServerSelectionError") {
      console.log("Mongoose Connection Error: Failed to connect to database");
    } else {
      console.log("Mongoose Connection Error:", err);
    }
  });

//============================================ Connection Event Handlers ========

//---------------------------- Disconnect Handling
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected: Lost connection to database");
});
//---------------------------- Disconnect Handling
mongoose.connection.on("close", () => {
  console.log("Mongoose Connection Closed: Database connection closed");
});
//---------------------------- Error Handling
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error:", err);
});

//============================================ Export ==============
module.exports = mongoose;
