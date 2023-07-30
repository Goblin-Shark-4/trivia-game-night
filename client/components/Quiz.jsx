import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCategory';

import './Quiz.css'; // Import the CSS file for the Quiz component

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get('whatever/api/questions');
        setQuizQuestions(response.data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuizQuestions();
  }, []); // finding the unique categories
  const categories = Array.from(
    new Set(quizQuestions.map((quiz) => quiz.category))
  );

  return (
    <div className='jeopardy-board'>
      <div className='categories'>
        {categories.map((category, index) => (
          <div key={index} className='category'>
            {category} // Sports, Programming
          </div>
        ))}
      </div>
      {/* quizQuestions { 
    
      sports: [{question1 - easy}, {question2 - easy}, {question3}, {question4}, {question5}],
      programming: [{question1 - easy}, {question2 - easy}, {question3}, {question4}, {question5}],
    } 
    
    
    */}
      <div className='questions'>
        {categories.map((category, index) => (
          <div key={index} className='question-row'>
            {quizQuestions
              .filter((quiz) => quiz.category === category)
              .map((question, questionIndex) => (
                <QuestionCard key={questionIndex} question={question} /> // question cards
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
