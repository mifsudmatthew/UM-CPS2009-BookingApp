// reference: https://mongoosejs.com/docs/guide.html
const mongoose = require("mongoose");
const schema = mongoose.Schema;

//creates schema
const loginSchema = new schema({
    username: String,
    password: String
});

// exports schema
const modal = mongoose.model("login",loginSchema);
module.exports = modal;
