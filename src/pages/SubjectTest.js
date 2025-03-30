import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const SubjectTest = () => {
    const { subject } = useParams();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [testSubmitted, setTestSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/questions?subject=${subject}`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, [subject]);

    const handleAnswerSelect = (questionId, selectedOption) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: selectedOption,
        });
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

            {testSubmitted ? (
                <h2 style={{ textAlign: "center", color: "#28a745" }}>
                    🎯 Test Submitted! Your Score: {score} / {questions.length}
                </h2>
            ) : null}

            {questions.map((question) => (
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

            {!testSubmitted && (
                <button onClick={handleSubmit} className="submit-btn">
                    Submit Test
                </button>
            )}
        </div>
    );
};

export default SubjectTest;
