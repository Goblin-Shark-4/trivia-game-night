import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCards';

// import './Quiz.css'; // Import the CSS file for the Quiz component

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await fetch('/questions');
        console.log('Here resp:', response);
        const data = await response.json();
        console.log('data', data);
        setQuizQuestions(data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuizQuestions();

    // fetch('http://localhost:8080')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setQuizQuestions(data);
    //   })
    //   .catch((err) => {
    //     console.error('Error fetching quiz questions:', err);
    //   });
  }, []);
  // finding the unique categories
  console.log(quizQuestions);
  // const categories = Array.from(
  //   new Set(quizQuestions.map((quiz) => quiz.category))
  // );
  if (!quizQuestions.length) return;

  const sports = quizQuestions.sports;
  return (
    <>
      <h4>Hi this is the Quiz</h4>
      <div className='jeopardy-board'>
        <div className='categories'>
          {sports.map((question, index) => (
            <div key={index} className='category'>
              {category} {/* {category} // Sports, Programming */}
            </div>
          ))}
        </div>
        {quizQuestions.sports}
        {/* quizQuestions { 
    
      sports: [{question1 - easy}, {question2 - easy}, {question3}, {question4}, {question5}],
      film: [{question1 - easy}, {question2 - easy}, {question3}, {question4}, {question5}],
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
    </>
  );
};

export default Quiz;
