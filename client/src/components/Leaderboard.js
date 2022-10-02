import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

const LeaderBoard = ({ playerScore, showLeaderboard }) => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [playerRank, setPlayerRank] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showName, setShowName] = useState(false);
  const [clear, setClear] = useState(false);

  const getPlayers = async () => {
    const response = await fetch("http://localhost:1020/players");
    const data = await response.json();
    setPlayers(data);
    const filt = data.filter((val) => val.score > playerScore);
    if (buttonClicked === false) {
      setPlayerRank(data.length - filt.length);
    }
    data.splice(data.length - filt.length, 0, {
      name: showName ? playerName : "",
      score: playerScore,
    });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const handleAdd = async () => {
    setButtonClicked(true);
    setShowName(true);
    setPlayerRank("");
    players[playerRank].name = playerName;
    const newPlayer = { name: playerName, score: playerScore };
    console.log(newPlayer);
    const response = await fetch("http://localhost:1020/players", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    await response.json();
  };

  const handleClear = async () => {
    setClear(true);
    const response = await fetch("http://localhost:1020/players", {
      method: "DELETE",
    });
    await response.json();
  };

  return (
    <Modal show={true} onHide={() => showLeaderboard(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Leaderboard (Top 10)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button onClick={handleClear}>Clear</button>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player Name</th>
              <th>Score in Seconds</th>
            </tr>
          </thead>
          <tbody>
            {!clear ? (
              players.map((player, index) => {
                if (index + 1 <= 10) {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {index === playerRank ? (
                          <>
                            <input
                              value={playerName}
                              onChange={(e) => setPlayerName(e.target.value)}
                            />
                            <button onClick={handleAdd}>Add!</button>
                          </>
                        ) : (
                          player.name
                        )}
                      </td>
                      <td>{player.score}</td>
                    </tr>
                  );
                }
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default LeaderBoard;
