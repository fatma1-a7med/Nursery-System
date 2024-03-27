const mongoose = require("mongoose");


//create schema object
const schema = new mongoose.Schema({
     _id: {type:Number},
     name: { type: String },
     supervisor: { type: mongoose.Types.ObjectId, ref: 'teachers' },
     children: [{ type: Number, ref: 'childrens' }],
});

//mapping
module.exports = mongoose.model("classes", schema);

