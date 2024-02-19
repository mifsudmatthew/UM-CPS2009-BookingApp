//Port Changed or updated depending on the generated port
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


//============================================ Port Setup =================
/* This makes use of the .env file to get the mongodb
 * links and information
 */
//--------------------------- Url Configuration
const mongoUrl =  `mongodb://`+
                  `${process.env.COSMOSDB_HOST}:` +
                  `${process.env.COSMOSDB_PORT}/` +
                  `${process.env.COSMOSDB_DBNAME}`+
                  `?ssl=true&replicaSet=globaldb`;
//--------------------------- Flags and Options Configuration
const mongoOptions = {
  auth: {
    username: process.env.COSMOSDB_USER,
    password: process.env.COSMOSDB_PASSWORD
  },
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  retryWrites: false
};

//============================================ Connection Setup =================
mongoose.connect(mongoUrl, mongoOptions)

  //---------------------------- Successful Creation
  .then(() => {
    console.log("Mongoose Successfully Connected");
  })

  //---------------------------- Error Handling
  .catch(err => {

    if (err.name === 'MongooseServerSelectionError') {
        console.log("Mongoose Connection Error: Failed to connect to database");
    } else {
        console.log("Mongoose Connection Error:", err);
    }

  });

//============================================ Connection Event Handlers ========

//---------------------------- Disconnect Handling
mongoose.connection.on('disconnected', () => {
  console.log("Mongoose Disconnected: Lost connection to database");
});
//---------------------------- Disconnect Handling
mongoose.connection.on('close', () => {
  console.log("Mongoose Connection Closed: Database connection closed");
});
//---------------------------- Error Handling
mongoose.connection.on('error', err => {
  console.log("Mongoose Connection Error:", err);
});

//============================================ Export ==============
module.exports = mongoose;