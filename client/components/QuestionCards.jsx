import React, { useState } from 'react';
import styles from '../Styles/QuestionCard.css';

const QuestionCard = ({ question }) => {
  const [showQuestion, setShowQuestion] = useState(true);

  return (
    <div
      className={`question-card ${!showQuestion && 'flipped'}`}
      onClick={() => setShowQuestion(!showQuestion)}
    >
      <div className='front'>
        <h3>{question.category}</h3>
        <h2>{question.difficulty}</h2>
      </div>
      <div className='back'>
        <h3>{question.question}</h3>
        {showQuestion ? null : (
          <div>
            <p>Correct Answer: {question.correct_answer}</p>
            <p>Incorrect Answers: {question.incorrect_answers.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
