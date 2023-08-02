import React, { useState } from 'react';
import styles from '../Styles/QuestionCard.css';

const shuffleArray = (array) => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function QuestionCard({ question, handleQuestionClick, setQuestion }) {
  const [timer, setTimer] = useState(20);
  const points = { easy: 1000, medium: 3000, hard: 5000 };

  // Combine correct_answer and incorrect_answers into a single array
  const answers = [question.correct_answer, ...question.incorrect_answers];

  // Shuffle the answers array to display them in random order
  const shuffledAnswers = shuffleArray(answers);
  {
    /* onClick={() => setShowQuestion(!showQuestion)} */
  }
  return (
    <div className="question-card" onClick={() => handleQuestionClick(question)}>
      <div className="front">
        <h2>{points[question.difficulty]}</h2>
      </div>
    </div>
  );
}

export default QuestionCard;
