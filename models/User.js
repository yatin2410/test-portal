const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    Id:{
        type: Number,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    IsAdmin:{
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model("users", UserSchema);