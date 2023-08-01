import React from 'react';
import QuestionCard from './QuestionCards';

const QuestionCategory = ({ category, questions }) => {
  return (
    <div className='question-category'>
      <h2>{category}</h2>
      <div className='question-cards'>
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
};

export default QuestionCategory;
