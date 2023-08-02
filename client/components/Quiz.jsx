import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCards';
import Question from './Question';
import '../Styles/Quiz.css'; // Import the CSS file for the Quiz component
// import backgroundImage from '../assets/background.jpg'
import Scoreboard from './Scoreboard';
import WinCondition from './Wincondition';
// import ResetQuiz from './ResetQuiz'

function Quiz({ user, setUser }) {
  console.log('quiz -----------------------------------------------');
  const navigate = useNavigate();
  // States
  const [playerTurn, setPlayerTurn] = useState(1);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionState, setQuestionState] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [newGame, setNewGame] = useState(false);
  // Points
  const points = { easy: 1000, medium: 3000, hard: 5000 };

  const resetGame = () => {
    console.log('reset game');
    setQuizQuestions([]);
    setQuestionState({});
    setAnsweredQuestions([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setHasWon(false); // change the type of state this is --> determine p1 p2 winner
    setNewGame(true);
    navigate('/');
  };

  // check if user won by checking every time score changes, redirect to /win
  useEffect(() => {
    if (player1Score >= 10000) {
      setPlayerTurn(1);
      setHasWon(true);
      navigate('/win');
    } else if (player2Score >= 10000) {
      setPlayerTurn(2);
      setHasWon(true);
      navigate('/win');
    }
  }, [player1Score, player2Score]);

  // const { sports, film, geography, music, television}  = quizQuestions;

  const handleQuestionClick = (question) => {
    setQuestionState(question);
    setAnsweredQuestions((prev) => [...prev, question.question]);
    navigate('/card');
  };

  // INCREMENT SCORE (player is state of playerTurn)
  const handleAnswerClick = (question, answer, player) => {
    if (question.correct_answer === answer) {
      if (player === 1) {
        setPlayer1Score((prevScore) => prevScore + points[question.difficulty]);
      } else {
        setPlayer2Score((prevScore) => prevScore + points[question.difficulty]);
      }
    } else {
      alert('Wrong answer!');
    }
    // this one's for John
    player === 1 ? setPlayerTurn(2) : setPlayerTurn(1);
    navigate('/');
  };

  const handleDeleteAccount = () => {
    fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
      }),
    })
      .then((res) => {
        console.log(`account for ${user.username} has been deleted`);
        localStorage.removeItem('triviaJwtToken');
        setUser({});
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  const handleLogOut = () => {
    localStorage.removeItem('triviaJwtToken');
    setUser({});
    navigate('/');
  };

  useEffect(() => {
    fetch('/questions')
      .then((response) => response.json())
      .then((data) => {
        // console.log('data', data);
        setQuizQuestions(data);
        setNewGame(false);
      })
      .catch((error) => {
        console.error('Error fetching quiz questions:', error);
      });
  }, [newGame]);

  if (!Object.keys(quizQuestions).length) return;

  return (
    <div id="quiz">
      <header>
        <h1>
          WELCOME,
          {user.username.toUpperCase()}
        </h1>
        <div>
          <button id="logOffBtn" onClick={handleLogOut}>
            LOG OUT
          </button>
          <button id="deleteAcctBtn" onClick={handleDeleteAccount}>
            DELETE ACCOUNT
          </button>
        </div>
      </header>
      <main>
        <nav id="scoreboard">
          <h2>
            {' '}
            <Scoreboard score={player1Score} playerNumber={1} />
            <Scoreboard score={player2Score} playerNumber={2} />
          </h2>
        </nav>

        {/* conditionally load based on user actions. Either loads quizboard, win, or the selected card */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="jeopardy-board">
                {Object.keys(quizQuestions).map((category, i) => (
                  <div className="questions">
                    <div className="category">{category}</div>
                    {quizQuestions[category].map(
                      (question, i) =>
                        // check if a question was already answered from the quizQuestions[category] array. If yes, then display empty card. If not, display card.
                        (!answeredQuestions.includes(question.question) && (
                          <QuestionCard
                            key={crypto.randomUUID()}
                            question={question}
                            handleQuestionClick={handleQuestionClick} // passing down the handleQuestionClick to QuestionCard
                            setQuestionState={setQuestionState}
                          />
                        )) || <div className="question-card" />,
                    )}
                  </div>
                ))}
              </div>
            }
          />

          <Route
            path="/card"
            element={
              <Question
                key={crypto.randomUUID()}
                question={questionState}
                handleAnswerClick={handleAnswerClick}
                points={points[questionState.difficulty]}
                playerTurn={playerTurn}
              />
            }
          />
          <Route
            path="/win"
            element={<WinCondition resetGame={resetGame} hasWon={hasWon} playerTurn={playerTurn} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default Quiz;
