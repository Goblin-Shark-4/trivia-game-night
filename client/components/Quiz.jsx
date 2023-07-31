import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCards';
import Question from './Question';
import '../Styles/Quiz.css'; // Import the CSS file for the Quiz component
// import backgroundImage from '../assets/background.jpg'
import Scoreboard from './Scoreboard'
import WinCondition from './Wincondition'
// import ResetQuiz from './ResetQuiz'

const Quiz = ({user}) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionState, setQuestion] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const points = { easy: 1000, medium: 3000, hard: 5000 };
  const navigate = useNavigate();
  const [hasWon, setHasWon] = useState(false);
  const [newGame, setNewGame] = useState(false);

  const resetGame = () => {
    console.log('reset game')
    setQuizQuestions([]);
    setQuestion({});
    setAnsweredQuestions([]);
    setScore(0);
    setHasWon(false)
    setNewGame(true)
    navigate('/')
  }

  useEffect(() => {
    if (score >= 10000) {
      setHasWon(true);
      navigate('/win')
    }
  }, [score]);
  
  // const { sports, film, geography, music, television}  = quizQuestions;

  const handleQuestionClick = (question) => {
    setQuestion(question);
    setAnsweredQuestions((prev) => [...prev, question.question])
    navigate('/card');
  }

  
  const handleAnswerClick = (question, answer) => {
  
    if (question.correct_answer === answer) {
      setScore((prevScore) => prevScore + points[question.difficulty]);
      navigate('/');
    }
  }
  
  const handleDeleteAccount = () => {
    fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type':
        'application/json',
      },
      body: JSON.stringify({
        username: user.username
      })
    })
    .then(res => {
      console.log(`account for ${user.username} has been deleted`);
      localStorage.removeItem('triviaJwtToken');
      navigate('/log-in')
    })
    .catch(err => console.error(err))
  }

  const handleLogOut = () => {
    return;
  }

  useEffect(() => {
      fetch('/questions')
      .then(response => response.json())
      .then(data => {
        setQuizQuestions(data) 
        setNewGame(false)
      })
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
      })
  }, [newGame]);
  
  if (!Object.keys(quizQuestions).length) return;
 
  return (
    <div id='quiz'>
      <header>
        <h1>WELCOME, {user.username.toUpperCase()}</h1>
        <div>
          <button id='logOffBtn' onClick={handleLogOut}>LOG OUT</button>
          <button id='deleteAcctBtn' onClick={handleDeleteAccount}>DELETE ACCOUNT</button>
        </div>
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
                  {quizQuestions[category].map((question,i) => (
                    (!answeredQuestions.includes(question.question) && <QuestionCard key={crypto.randomUUID()} question={question} handleQuestionClick={handleQuestionClick} setQuestion={setQuestion} />) || <div className='question-card'></div>
                    ))
                  }
                  </div>
                ))}
              </div>
            } />
            
              <Route path={'/card'} element={<Question question={questionState} handleAnswerClick={handleAnswerClick} points={points[questionState.difficulty]}/>} />
            <Route path={'/win'} element={<WinCondition score={score}  resetGame={resetGame} hasWon={hasWon} />} />
          </Routes>
              
      </main>
    </div>
  );
};
   

export default Quiz;
