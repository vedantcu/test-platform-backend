import React, { useState } from "react";
import "../styles.css";

const questions = [
    {
        id: 1,
        question: "If a statement is always true, it is called a?",
        options: ["Contradiction", "Tautology", "Contingency", "Proposition"],
        correctAnswer: "Tautology",
        solution: "A tautology is a statement that is always true regardless of the truth values of its components."
    },
    {
        id: 2,
        question: "The logical equivalence of (p → q) is?",
        options: ["~p ∨ q", "p ∧ q", "p ↔ q", "~p ∧ q"],
        correctAnswer: "~p ∨ q",
        solution: "Implication (p → q) is logically equivalent to (~p ∨ q)."
    },
    {
        id: 3,
        question: "What is the negation of 'If it rains, then the ground is wet'?",
        options: ["It does not rain and the ground is wet", "It rains and the ground is not wet", "The ground is wet", "It does not rain"],
        correctAnswer: "It rains and the ground is not wet",
        solution: "Negation of 'p → q' is 'p ∧ ~q'."
    },
    {
        id: 4,
        question: "A statement that is always false is called?",
        options: ["Tautology", "Contingency", "Contradiction", "Implication"],
        correctAnswer: "Contradiction",
        solution: "A contradiction is a statement that is always false."
    },
    {
        id: 5,
        question: "Which of the following is not a logical connective?",
        options: ["AND", "OR", "IF", "WITH"],
        correctAnswer: "WITH",
        solution: "'WITH' is not a standard logical connective."
    },
    {
        id: 6,
        question: "What does the expression ~(p ∨ q) simplify to?",
        options: ["~p ∧ ~q", "~p ∨ ~q", "p ∧ q", "p ∨ q"],
        correctAnswer: "~p ∧ ~q",
        solution: "Using De Morgan's theorem, ~(p ∨ q) = ~p ∧ ~q."
    },
    {
        id: 7,
        question: "Which of the following is a biconditional statement?",
        options: ["p → q", "p ∨ q", "p ↔ q", "p ∧ q"],
        correctAnswer: "p ↔ q",
        solution: "A biconditional statement is represented as 'p ↔ q'."
    },
    {
        id: 8,
        question: "What is the truth value of 'p ∨ ~p'?",
        options: ["Always true", "Always false", "Depends on p", "Cannot be determined"],
        correctAnswer: "Always true",
        solution: "By the law of excluded middle, p ∨ ~p is always true."
    },
    {
        id: 9,
        question: "Which of the following is NOT a proposition?",
        options: ["It is raining", "2 + 2 = 4", "x + y = z", "The sun is a star"],
        correctAnswer: "x + y = z",
        solution: "A proposition must be either true or false. 'x + y = z' is not a proposition."
    },
    {
        id: 10,
        question: "What does the expression (p ∧ q) → p mean?",
        options: ["p is true", "q is true", "p ∧ q is true", "Nothing can be inferred"],
        correctAnswer: "p is true",
        solution: "(p ∧ q) → p means that if p and q are both true, then p is also true."
    }
];

const MathematicalLogicTest = () => {
    return (
        <div className="test-container">
            <h1>📂 Mathematical Logic - Test</h1>
            <a href="/test/start" className="start-test-btn">Start Test</a>
        </div>
    );
};

export default MathematicalLogicTest;
