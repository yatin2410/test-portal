const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const QuizSchema = new Schema({
    quiz:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    percentageToPass:{
        type: Number,
        required: true
    },
    assignToGroups:{
        type: Array,
        required: true
    },
    addQuestions:{
        type: Array,
        required: true
    }
});

module.exports = Quiz = mongoose.model("quizzes", QuizSchema);