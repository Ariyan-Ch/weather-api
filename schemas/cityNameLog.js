const mongoose = require('mongoose');
/*const testingSchema = new mongoose.Schema({
    name: String,
    number: {
        type : Number,
        required : [true, "Number field is required"]
    },
    trait: {
        type : String,
        default : "Bland"
    }
});*/

const CityLog = new mongoose.Schema({
    City:{type:String,required:true},
    Date:{type:Date,default:Date.now}
})

const collectionName = 'CityNameLogs'
module.exports = mongoose.model(collectionName, CityLog);