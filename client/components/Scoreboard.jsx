import React from 'react';

function Scoreboard({ score, playerNumber }) {
  return (
    <div className="scoreboard">
      <h2>
        {' '}
        Player
        {playerNumber}
      </h2>
      <h2>
        {' '}
        Score:
        {score}
      </h2>
    </div>
  );
}

export default Scoreboard;
