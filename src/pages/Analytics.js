import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css"; // Ensure styles are applied

const Analytics = () => {
  const [results, setResults] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/analytics");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };
    fetchResults();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  return (
    <div className={`analytics-container ${darkMode ? "dark" : ""}`}>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 className={`analytics-title ${darkMode ? "dark" : ""}`}>📊 Test Analytics</h1>


      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Subject</th>
              <th>Topic</th>
              <th>Score (%)</th>
              <th>Correct Answers</th>
              <th>Total Questions</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.user}</td>
                <td>{result.subject}</td>
                <td>{result.topic}</td>
                <td>{result.score.toFixed(2)}</td>
                <td>{result.correctAnswers}</td>
                <td>{result.totalQuestions}</td>
                <td>{new Date(result.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="loading-message">No test results available.</p>
      )}
    </div>
  );
};

export default Analytics;
