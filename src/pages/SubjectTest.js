import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const API_URL = "https://test-platform-backend-fan9.onrender.com/api/questions"; // ✅ Updated API URL

const SubjectTest = () => {
    const { subject } = useParams();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [testSubmitted, setTestSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${API_URL}?subject=${subject}`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError("Failed to load questions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [subject]);

    const handleAnswerSelect = (questionId, selectedOption) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    const handleSubmit = () => {
        let totalScore = 0;
        questions.forEach((question) => {
            if (userAnswers[question._id] === question.correctAnswer) {
                totalScore += 1;
            }
        });

        setScore(totalScore);
        setTestSubmitted(true);
    };

    return (
        <div className="test-container">
            <h1 style={{ textAlign: "center" }}>{subject.toUpperCase()} Test</h1>

            {loading && <p className="loading-message">Loading questions...</p>}
            {error && <p className="error-message">{error}</p>}

            {testSubmitted && !loading && (
                <h2 style={{ textAlign: "center", color: "#28a745" }}>
                    🎯 Test Submitted! Your Score: {score} / {questions.length}
                </h2>
            )}

            {!loading && !error && questions.map((question) => (
                <div key={question._id} className="question-block">
                    <h3 className="question">{question.questionText}</h3>
                    <div className="options">
                        {question.options.map((option) => {
                            let highlightClass = "";
                            if (testSubmitted) {
                                if (option === question.correctAnswer) {
                                    highlightClass = "correct";
                                } else if (userAnswers[question._id] === option) {
                                    highlightClass = "wrong";
                                }
                            }

                            return (
                                <label key={option} className={highlightClass}>
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        onChange={() => handleAnswerSelect(question._id, option)}
                                        disabled={testSubmitted}
                                    />
                                    {option}
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}

            {!testSubmitted && !loading && (
                <button onClick={handleSubmit} className="submit-btn">
                    Submit Test
                </button>
            )}
        </div>
    );
};

export default SubjectTest;
