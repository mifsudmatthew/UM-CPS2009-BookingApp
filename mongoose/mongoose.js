//Port Changed or updated depending on the generated port

const schema = require("./mongoose/database"); // Loading the schema/Modal not yet used
mongoose.set('strictQuery', false);

const mongoose = require('mongoose');

// MongoDB connection URL
const mongoUrl = `mongodb://
                    ${process.env.COSMOSDB_HOST}:
                    ${process.env.COSMOSDB_PORT}/
                    ${process.env.COSMOSDB_DBNAME}
                    ?ssl=true&replicaSet=globaldb`;

// MongoDB connection options
const mongoOptions = {
  auth: {
    username: process.env.COSMOSDB_USER,
    password: process.env.COSMOSDB_PASSWORD
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false
};



mongoose.connect(mongoUrl, mongoOptions)
  .then(() => {
    console.log("Mongoose Successfully Connected");
  })
  .catch(err => {
    // IF you want to see the full error remove the if statement 
    // This is here to simplyfy the error message since it can be long
    // this should only catch and cover up the error when the server doesn't connect 
    // All other errors should be outputed as normal
    if (err.name === 'MongooseServerSelectionError') {
        console.log("Mongoose Connection Error: Failed to connect to database");
    } else {
        console.log("Mongoose Connection Error:", err);
    }
  });
// Connection event handlers
mongoose.connection.on('disconnected', () => {
  console.log("Mongoose Disconnected: Lost connection to database");
});

mongoose.connection.on('close', () => {
  console.log("Mongoose Connection Closed: Database connection closed");
});

// Error event handler
mongoose.connection.on('error', err => {
  console.log("Mongoose Connection Error:", err);
  process.exit(1);
});
async function save(){ // save to database
  let item = {"username":"Tester", "password":"testing"}
  const dbpush = new schema(item);
  await dbpush.save();
}
//save()