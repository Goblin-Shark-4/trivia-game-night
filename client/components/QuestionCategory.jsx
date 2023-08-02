import React from 'react';
import QuestionCard from './QuestionCards';

const getFontSize = (textLength) => {
  const baseSize = 9;
  if (textLength >= baseSize) {
    textLength = baseSize - 2;
  }
  const fontSize = baseSize - textLength;
  return `${fontSize}vw`;
};

function QuestionCategory({ category, questions }) {
  return (
    <div className="question-category">
      {console.log('category', category.length)}
      <h2 style={{ fontSize: getFontSize(category.length) }}>{category}</h2>
      <div className="question-cards">
        {questions.easy.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
        {questions.medium.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
        <QuestionCard question={questions.hard[0]} />
      </div>
    </div>
  );
}

export default QuestionCategory;
