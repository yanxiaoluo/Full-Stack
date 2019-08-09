require('../libs/mongo_config');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let stuSchema =  new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        default: "female"
    },
    address: String
});

let StuModel = mongoose.model("student", stuSchema);
module.exports = StuModel;