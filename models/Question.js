const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const QuestionSchema = new Schema({
    type:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    question:{
        type: String,
        required:true,
    },
    difficulty:{
        type: String,
        required:true,
    },
    o1:{
        type: String,
        required: true,
    },
    o2:{
        type:String,
        required:true,
    },
    o3:{
        type: String,
        required: true,
    },
    o4:{
        type: String,
        required: true,
    },
    ans:{
        type: Array,
        required: true,
    }
});

module.exports = Question = mongoose.model("questions", QuestionSchema);