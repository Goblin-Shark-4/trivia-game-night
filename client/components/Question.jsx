/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import useSound from 'use-sound';
import jeopardyMusic from '../assets/jeopardy.mp3';
import '../Styles/Question.css';
import Timer from './Time';

const shuffleArray = (array) => {
  const shuffledArray = [...array];

  // eslint-disable-next-line no-plusplus
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function Question({ question, handleAnswerClick, points }) {
  const [play, { stop }] = useSound(jeopardyMusic, { volume: 0.1 });

  useEffect(() => {
    play();
    return function cleanup() {
      stop();
    };
  }, [play, stop]);

  // const handleBtnClick = () => {
  // decode html text received from API
  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  // }

  const answers = shuffleArray([question.correct_answer, ...question.incorrect_answers]);

  return (
    <>
      <Timer points={points} />
      <div className="question-container">
        <h1 className="question-title">{decodeHtml(question.question)}</h1>
        <div className="answer-container">
          {answers.map((answer, i) => (
            <button
              type="button"
              className="answer"
              key={i}
              onClick={() => handleAnswerClick(question, answer)}
            >
              {decodeHtml(answer)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Question;
