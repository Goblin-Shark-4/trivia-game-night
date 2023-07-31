import React, {useState, useEffect} from 'react'
import useSound from 'use-sound';
import '../Styles/WinCondition.css' // this will be neon color
import Alex from '../assets/AlexTrebek.jpg'
import Music from '../assets/CongratulationsSnip.mp3'

const WinCondition = ({score}) => {
  const [hasWon, setHasWon] = useState(false);
  const [play, {stop}] = useSound(Music);

  useEffect(() => {
    if (score >= 10000) {
      setHasWon(true);
    }
  }, [score]);

  useEffect(() => {
      if (hasWon) {
        play();
        return function cleanup() {
          stop();
        }
      }
    }, [play, stop])

  return (
    <div>
      {hasWon && (
        <div className = "win-container">
          <h2 className="neon-text"> Congratulations!  You've Won! </h2>
          <img src={Alex} alt="Alex Trebek" />
          <audio autoPlay loop>
            <source src={Music} type="audio/mp3" />
            </audio>
            <button onClick={resetGame}> Play Again</button>
            </div>
      )}
      </div>
  );
};

export default WinCondition
