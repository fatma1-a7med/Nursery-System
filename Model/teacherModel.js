const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//create schema object
const schema = new mongoose.Schema({
     //_id: {type:mongoose.Types.ObjectId},
     fullname: { type: String },
     password: { type: String ,required: true},
     email: { type: String, required: true},
     image: {type:String},
     role: { type: String, enum: ["teacher", "supervisor"], default: "teacher" }
});

schema.plugin(AutoIncrement, { id: '_id', inc_field: 'autoIncrement' });

// Mapping to generate collections
module.exports = mongoose.model("teachers", schema);



