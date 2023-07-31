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
  const [showResetQuiz, setShowResetQuiz] = useState(false)
  const navigate = useNavigate();
  
  // const { sports, film, geography, music, television}  = quizQuestions;
  // answeredQuestions.forEach(id => {
  //   const ele = document.getElementById(id);
  //   console.log(ele, 'ele');
  //   ele.classList.add('hideCard');
  // })

  const handleQuestionClick = (question, id) => {
    setQuestion(question);
    console.log(id,'id')
    setAnsweredQuestions((prev) => [...prev, id])
    navigate('/card');
  }

  
  const handleAnswerClick = (question, answer) => {
    
  
    if (question.correct_answer === answer) {
      setScore((prevScore) => prevScore + points[question.difficulty]);
      console.log('answer', answer);
      console.log('score', score)
      navigate('/');
    }

    // if(newScore >= 10000){
    //   setShowResetQuiz(true);
    //   setScore(0);
    // }
    // else{
    //   nagtivate('/')
    // }
    // setAnsweredQuestions((prevAnswered) => [...prevAnswered, question._id])
  }
  
  console.log('score2', score)

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
        <div>
          <button id='logOffBtn' onClick={handleLogOut}>LOG OUT</button>
          <button id='deleteAcctBtn' onClick={handleDeleteAccount}>DELETE ACCOUNT</button>
        </div>
      </header>
      <main>
        <nav id='scoreboard'>
          <h2> <Scoreboard score={score} /></h2>
            <WinCondition score ={score} />
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
                  {quizQuestions[category].map((question,i) => (
                    <QuestionCard key={crypto.randomUUID()} id={crypto.randomUUID()} question={question} handleQuestionClick={handleQuestionClick} setQuestion={setQuestion} />))
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
