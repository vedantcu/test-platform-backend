import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css"; // Ensure styles are applied

const ThreeDGeometryTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
  const [timer, setTimer] = useState(600); // ⏳ 10 minutes (600 seconds)
  const [score, setScore] = useState(null); // ✅ Store Score
  const [correctCount, setCorrectCount] = useState(0); // ✅ Correct Answers Count

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://test-platform-backend-fan9.onrender.com/api/questions?topic=3D%20Geometry");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // ⏳ Timer Logic
  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, submitted]);

  // ✅ Dark Mode Toggle
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  const handleOptionChange = (questionId, selectedOption) => {
    if (!submitted) {
      setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selectedOption }));
    }
  };

  // ✅ Handle Submit
  const handleSubmit = async () => {
    let correct = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        correct += 1;
      }
    });

    const totalQuestions = questions.length;
    const finalScore = (correct / totalQuestions) * 100;

    setScore(finalScore);
    setCorrectCount(correct);
    setSubmitted(true);

    // ✅ Save the result to MongoDB for Analytics
    try {
      await axios.post("http://localhost:5000/api/save-result", {
        user: "test-user", // You can modify this to take the logged-in user
        subject: "Maths",
        topic: "3D Geometry",
        score: finalScore,
        totalQuestions,
        correctAnswers: correct,
      });
    } catch (error) {
      console.error("Error saving test result:", error);
    }
  };

  return (
    <div className={`test-container ${darkMode ? "dark" : ""}`}>
      {/* ✅ Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* ✅ Test Title */}
      <h1 className={`test-title ${darkMode ? "dark-text" : ""}`}>3D Geometry Test</h1>

      {/* ✅ Timer Display */}
      {!submitted && (
        <p className="timer">
          ⏳ Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
        </p>
      )}

      {/* ✅ Display Questions */}
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index} className="question-box">
            <p className="question-text">
              <strong>Q{index + 1}:</strong> {q.questionText}
            </p>
            <div className="options">
              {q.options.map((option, i) => (
                <div
                  key={i}
                  className={`option-box ${
                    submitted
                      ? option === q.correctAnswer
                        ? "correct-answer"
                        : option === answers[q._id]
                        ? "wrong-answer"
                        : ""
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={`q${index}-option${i}`}
                    name={`question-${q._id}`}
                    value={option}
                    onChange={() => handleOptionChange(q._id, option)}
                    disabled={submitted}
                  />
                  <label htmlFor={`q${index}-option${i}`}>{option}</label>
                </div>
              ))}
            </div>
            {submitted && <p className="solution">✅ Solution: {q.solution}</p>}
          </div>
        ))
      ) : (
        <p className="loading-message">Loading questions...</p>
      )}

      {/* ✅ Submit Button */}
      {!submitted && (
        <button onClick={handleSubmit} className="submit-btn" disabled={timer === 0}>
          Submit Test
        </button>
      )}

      {/* ✅ Show Score After Submission */}
      {submitted && (
        <div className="score-box">
          <h2>🎯 Test Completed!</h2>
          <p>
            ✅ Correct Answers: <strong>{correctCount}</strong>
          </p>
          <p>
            ❌ Wrong Answers: <strong>{questions.length - correctCount}</strong>
          </p>
          <h3>Your Score: <span>{score.toFixed(2)}%</span></h3>
        </div>
      )}
    </div>
  );
};

export default ThreeDGeometryTest;
