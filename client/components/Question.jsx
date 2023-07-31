import React, {useEffect, useState} from 'react';
import useSound from 'use-sound';
import jeopardyMusic from '../assets/jeopardy.mp3'
import '../Styles/Question.css'
import Timer from './Time';


const shuffleArray = (array) => {

    const shuffledArray = [...array];
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};


const Question = ({ question, handleAnswerClick, points }) => {
    const [play, {stop}] = useSound(jeopardyMusic);
    
    useEffect(() => {
        play();
        return function cleanup() {
            stop();
        }
    }, [play, stop])

    // const handleBtnClick = () => {
        
    // }

    const answers = shuffleArray([question.correct_answer, ...question.incorrect_answers]);
    
    return (
        <>  
            <Timer points={points} />
            <div className='question-container'>
                <h1 className='question-title'>{question.question}</h1>
                <div className ='answer-container'>
                    {answers.map((answer, i) => {
                    return <button className='answer' key={i} onClick={(e) => handleAnswerClick(question, answer)}>{answer}</button>
                    })}
                </div>
            </div>
        </>
    )
}


export default Question;