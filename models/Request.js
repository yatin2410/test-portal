const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RequestSchema = new Schema({
  uid: {
    type: String,
    required: true
  }
});

module.exports = Request = mongoose.model("requests", RequestSchema);
