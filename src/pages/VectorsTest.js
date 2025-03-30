import React, { useState, useEffect } from "react";
import axios from "axios";

const VectorsTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes

  // Fetch Vectors questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions?topic=Vectors");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Timer Countdown
  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, submitted]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vectors Test</h1>
      <p>Time Left: {Math.floor(timer / 60)}:{timer % 60}</p>

      {questions.length > 0 ? (
        questions.map((q, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: submitted && answers[q._id] === q.correctAnswer ? "lightgreen" : submitted ? "lightcoral" : "white",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px"
            }}>
            <p>{q.questionText}</p>
            {q.options.map((option, i) => (
              <label key={i} style={{ display: "block" }}>
                <input 
                  type="radio" 
                  name={q._id} 
                  value={option} 
                  onChange={() => setAnswers({ ...answers, [q._id]: option })}
                  disabled={submitted} 
                /> 
                {option}
              </label>
            ))}
            {submitted && <p><strong>Solution:</strong> {q.solution}</p>}
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}

      <button onClick={handleSubmit} disabled={submitted}>Submit Test</button>
    </div>
  );
};

export default VectorsTest;
