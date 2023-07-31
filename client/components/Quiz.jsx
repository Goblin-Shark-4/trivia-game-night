import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCards';

import styles from '../Styles/Quiz.css'; // Import the CSS file for the Quiz component

const Quiz = ({user}) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const { sports, film, geography, music, television}  = quizQuestions;

  useEffect(() => {
      fetch('/questions')
      .then(response => response.json())
      .then(data => setQuizQuestions(data))
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
      })
  }, []);
  // finding the unique categories
  console.log(quizQuestions);
  // const categories = Array.from(
  //   new Set(quizQuestions.map((quiz) => quiz.category))
  // );
  if (!Object.keys(quizQuestions).length) return;
  console.log(sports, 'sports')
  return (
    <>
      <h1>WELCOME, {user.username.toUpperCase()}</h1>
      <h2>Location: {user.location}</h2>
      <h4>Hi this is the Quiz</h4>
      <div className='jeopardy-board'>
        <div className='questions'>
          <div className='category'>
            {sports[0].category}
          </div>
          {sports.map((question, questionIndex) => (<QuestionCard key={questionIndex} question={question} />))}
        </div>

        <div className='questions'>
          <div className='category'>
            {film[0].category}
          </div>
          {film.map((question, questionIndex) => (<QuestionCard key={questionIndex} question={question} />))}
        </div>

        <div className='questions'>
          <div className='category'>
            {geography[0].category}
          </div>
          {geography.map((question, questionIndex) => (<QuestionCard key={questionIndex} question={question} />))}
        </div>

        <div className='questions'>
          <div className='category'>
            {television[0].category}
          </div>
          {television.map((question, questionIndex) => (<QuestionCard key={questionIndex} question={question} />))}
        </div>

        <div className='questions'>
          <div className='category'>
            {music[0].category}
          </div>
          {music.map((question, questionIndex) => (<QuestionCard key={questionIndex} question={question} />))}
        </div>
      </div>
    </>
  );
};

export default Quiz;
