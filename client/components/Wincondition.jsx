import React, {useState, useEffect} from 'react'
import useSound from 'use-sound';
import '../Styles/WinCondition.css' // this will be neon color
import Alex from '../assets/AlexTrebek.jpg'
import Music from '../assets/CongratulationsSnip.mp3'

const WinCondition = ({score, resetGame, hasWon}) => {
  console.log(resetGame)
  const [play, {stop}] = useSound(Music);

  
  useEffect(() => {
      if (hasWon) {
        play();
        return function cleanup() {
          stop();
        }
      }
    }, [play, stop])
    
  return (
    <div className = "win-container">
      <h2 className="neon-text"> Congratulations!  You've Won! </h2>
      <img id="alex" src={Alex} alt="Alex Trebek" />
      <button id="playAgain" onClick={resetGame}> Play Again</button>
    </div>
  
  );
};

export default WinCondition
