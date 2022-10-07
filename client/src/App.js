import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import Game from "./components/TicTacToe/Game";
import Leaderboard from "./components/Leaderboard";

function App() {
  const NROWS = 3;
  const NCOLS = 3;
  const BOXES = [...Array(NROWS * NCOLS).keys()].map((val) => val + 1);
  const [showRecord, setShowRecord] = useState(false);
  const [score, setScore] = useState(0);

  const showLeaderboard = (show, scoreData) => {
    console.log(show, scoreData);
    setShowRecord(show);
    setScore(scoreData);
  };

  return (
    <div className="App">
      <div className="game">
        <h1>tic-tac-toe</h1>

        {showRecord ? (
          <Leaderboard playerScore={score} showLeaderboard={showLeaderboard} />
        ) : (
          <Game BOXES={BOXES} showLeaderboard={showLeaderboard} />
        )}
      </div>
    </div>
  );
}

export default App;
