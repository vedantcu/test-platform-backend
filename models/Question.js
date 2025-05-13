const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  subject: String,
  topic: String,
  questionText: String,
  options: [String],
  correctAnswer: String,
  solution: String
});

module.exports = mongoose.model("Question", QuestionSchema);
