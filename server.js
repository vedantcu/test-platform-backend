require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Question = require("./models/Question");
const TestResult = require("./models/TestResult");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Restrict CORS to frontend URL
    credentials: true,
  })
);

// ✅ Ensure MONGO_URI is Defined
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in .env file!");
  process.exit(1);
}

// ✅ MongoDB Connection with Retry Mechanism
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5s timeout
    });
    console.log("✅ SUCCESS: Connected to MongoDB");
  } catch (err) {
    console.error("❌ ERROR: MongoDB Connection Failed:", err.message);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};
connectDB();

// ✅ Fetch Questions API
app.get("/api/questions", async (req, res) => {
  try {
    const { subject, topic } = req.query;
    let filter = {};
    if (subject) filter.subject = subject;
    if (topic) filter.topic = topic;

    const questions = await Question.find(filter);
    if (!questions.length) {
      return res.status(404).json({ message: "⚠ No questions found" });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("❌ ERROR: Unable to fetch questions:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Save Test Results API
app.post("/api/save-result", async (req, res) => {
  try {
    const { user, subject, topic, score, totalQuestions, correctAnswers } = req.body;

    if (!user || !subject || !topic || score === undefined || !totalQuestions || !correctAnswers) {
      return res.status(400).json({ message: "❌ ERROR: Missing required fields" });
    }

    const newResult = new TestResult({
      user,
      subject,
      topic,
      score,
      totalQuestions,
      correctAnswers,
    });

    await newResult.save();
    res.status(201).json({ message: "✅ Test result saved successfully!" });
  } catch (error) {
    console.error("❌ ERROR: Saving test result failed:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Fetch Analytics Data API
app.get("/api/analytics", async (req, res) => {
  try {
    const results = await TestResult.find();
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ ERROR: Fetching analytics failed:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🚀 SERVER STARTED: Running on http://localhost:${PORT}`);
});
