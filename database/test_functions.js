const booking_schema = require("./schemas/booking_schema"); // Importing the schemas created
const user_schema = require("./schemas/user_schema");
const courts_schema = require("./schemas/courts_schema");
//====================== Basic Functions ====================

//---------------------Basic Save Test------------------------
async function saveTestCase(){ 
    try {
            let item = {    "email":"tester@gmail.com",
            "password":"testing",
            "name": "tester101",
            "balance": 123}
        const dbpush = new user_schema(item);
        await dbpush.save();
    } catch (error) {
        console.log(error);
    }
}

//======================= Export ========
module.exports = {
    saveTestCase: saveTestCase
};
