import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCards';
import Question from './Question';
import '../Styles/Quiz.css'; // Import the CSS file for the Quiz component
// import backgroundImage from '../assets/background.jpg'
import Scoreboard from './Scoreboard'
const Quiz = ({user}) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionState, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const points = { easy: 1000, medium: 3000, hard: 5000 };
  
  const navigate = useNavigate();
  // const { sports, film, geography, music, television}  = quizQuestions;

  const handleQuestionClick = (question) => {
    setQuestion(question);
    navigate('/card');
  }

  
  const handleAnswerClick = (question, answer) => {
    if (question.correct_answer === answer) {
      setScore((prevScore) => prevScore + points[question.difficulty]);
      console.log('answer', answer);
      console.log('score', score)
      navigate('/');
    }
  }
  console.log('score2', score)

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
  // console.log(sports, 'sports')
  return (
    <div id='quiz'>
      <header>
        <h1>WELCOME, {user.username.toUpperCase()}</h1>
      </header>
      <main>
        <nav id='scoreboard'>
          <h2> <Scoreboard score={score} /></h2>
        </nav>
        
          <Routes>
              <Route path={'/'} element={
                
                <div className='jeopardy-board'>
                  {Object.keys(quizQuestions).map((category, i) => (
                    <div className='questions'>
                      <div className='category'>
                      {category}
                    </div>
                  {console.log('cat', category)}
                  {quizQuestions[category].map(question => (
                    <QuestionCard key={crypto.randomUUID()} question={question} handleQuestionClick={handleQuestionClick} setQuestion={setQuestion} />))
                  }
                  </div>
                ))}
              </div>
            } />
            
              <Route path={'/card'} element={<Question question={questionState} handleAnswerClick={handleAnswerClick} />} />
            </Routes>
              
      </main>
    </div>
  );
};
   

export default Quiz;
