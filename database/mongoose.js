const mongoose = require("mongoose"); // Obtaining the mongoose module

// Configuring mongoose such that if you attempt to query a property that is not defined
// in the schema, an error is thrown
mongoose.set("strictQuery", true);

/** ============================================ Port Setup =======================
 * This makes use of the .env file to get the mongodb
 * links and information
 */

//--------------------------- Url Configuration
/**
 * @constant {string} mongoose_Url - The URL for the MongoDB database.
 */
const mongoose_Url =
  `mongodb+srv://` +
  `${process.env.MONGODB_USERNAME}` +
  `:` +
  `${process.env.MONGODB_PASSWORD}` +
  `@` +
  `${process.env.CLUSTER}` +
  `/` +
  `${process.env.DATABASENAME}`;

//--------------------------- Flags and Options Configuration
const mongoose_Options = {
  retryWrites: true,
  w: "majority",
};
// ============================================ Connection Setup =================

/**
 * Function that creates a connection to the MongoDB database.
 * @category Database
 * @returns {Promise} A promise that resolves when the connection is established.
 */
async function connectToDatabase() {
  await mongoose
    .connect(mongoose_Url, mongoose_Options)

    //---------------------------- Successful Creation
    .then(() => {
      console.log("Mongoose Successfully Connected");
    })

    //---------------------------- Error Handling
    .catch((err) => {
      if (err.name === "MongooseServerSelectionError") {
        console.log(
          "Mongoose [Initialization] Error: Failed to connect to database"
        );
      } else {
        console.log("Mongoose [Initialization]", err);
      }
    });
}
/**============================================ Connection Event Handlers ========
 * Event Handlers
 */

//---------------------------- Disconnect Handling
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected [Callback]: Lost connection to database");
});
//---------------------------- Disconnect Handling
mongoose.connection.on("close", () => {
  console.log(
    "Mongoose Connection Closed [Callback]: Database connection closed"
  );
});
//---------------------------- Error Handling
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection [Callback]", err);
});

/**============================================ Export ==============
 * Exportation of current Mongoose instance
 */

connectToDatabase();
module.exports = mongoose;
