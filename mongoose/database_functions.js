
const schema = require("./schemas");

//============================================ Basic Functions ========

//---------------------------------- Basic Save Test
async function saveTestCase(){ 
    let item = {"username":"Tester", "password":"testing"}
    const dbpush = new schema(item);
    await dbpush.save();
}


//============================================ Export ========
module.exports = {
    save: save
};