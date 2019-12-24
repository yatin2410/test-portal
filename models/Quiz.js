const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const QuizSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  perToPass: {
    type: Number,
    required: true
  },
  groups: {
    type: Array,
    required: true
  },
  questions: {
    type: Array,
    required: true
  }
});

module.exports = Quiz = mongoose.model("quizs", QuizSchema);
