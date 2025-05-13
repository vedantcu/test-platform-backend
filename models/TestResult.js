const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema({
  user: String,
  subject: String,
  topic: String,
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TestResult", TestResultSchema);
