import React from 'react';
import '../Styles/Question.css'

const shuffleArray = (array) => {

    const shuffledArray = [...array];
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};


const Question = ({ question, handleAnswerClick }) => {

    const answers = shuffleArray([question.correct_answer, ...question.incorrect_answers]);
    
    return (
        <div className='question-container'>
            <h1 className='question-title'>{question.question}</h1>
            <div className ='answer-container'>
            {answers.map((answer, i) => {
        return <button className='answer' key={i} onClick={(e) => handleAnswerClick(question, answer)}>{answer}</button>
    })}
    </div>
        </div>
    )
}


export default Question;