const mongoose = require("mongoose");
const moment = require('moment');

const userDataSchema = mongoose.Schema({
  shirts_quantity: { type: Number },
  tshirts_quantity: { type: Number },
  trousers_quantity: { type: Number },
  jeans_quantity: { type: Number },
  boxers_quantity: { type: Number },
  joggers_quantity: { type: Number },
  others_quantity: { type: Number },
  pickupcharges: { type: Number },
  location: { type: String },
  type: { type: String },
  address: { type: String },
  phone: { type: String },
  total: { type: Number },
  shirts: {type: [mongoose.Schema.Types.Mixed]},
  tshirts: {type: [mongoose.Schema.Types.Mixed]},
  trousers: {type: [mongoose.Schema.Types.Mixed]},
  jeans: {type: [mongoose.Schema.Types.Mixed]},
  boxers: {type: [mongoose.Schema.Types.Mixed]},
  joggers: {type: [mongoose.Schema.Types.Mixed]},
  others: {type: [mongoose.Schema.Types.Mixed]},
  status: { type: String },
  submittedDate: {
    type: String,
    default: () => moment().format('DD MMMM YYYY, HH:mm')
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model("userData", userDataSchema);
