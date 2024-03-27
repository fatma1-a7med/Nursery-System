const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema(
     {
       city: String,
       street: Number,
       building:Number
     },
     { _id: false }
   );

//create schema object
const schema = new mongoose.Schema({
     _id: {type:Number},
     fullname: { type: String },
     age: { type: Number },
     level: { type: String},
     address: addressSchema,
});

//mapping
module.exports = mongoose.model("childrens", schema);

