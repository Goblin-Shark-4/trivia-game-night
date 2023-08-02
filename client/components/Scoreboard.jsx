import React from 'react';

const Scoreboard = ({ score, playerNumber }) => {
  return (
    <div className='scoreboard'>
      <h2 className='playerNumber'> Player {playerNumber} </h2>
      <h2 className='score'> Score: {score} </h2>
    </div>
  );
};

export default Scoreboard;
