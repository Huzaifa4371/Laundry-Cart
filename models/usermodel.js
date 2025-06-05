const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name : {type:String},
  phone : {type:Number},
  district : {type:String},
  pincode : {type:Number},
  email : {type:String},
  state : {type:String},
  address : {type:String},
  password : {type:String}
});

module.exports = mongoose.model("user", userSchema);
