import { useState } from "react";
import OXModal from "./OXModal";
import GameOver from "./GameOverModal";
import Modal from "react-bootstrap/Modal";

const Game = ({ BOXES, showLeaderboard }) => {
  const [userBox, setUserBox] = useState([]);
  const [compBox, setCompBox] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [winner, setWinner] = useState("");
  const [userMove, setUserMove] = useState("");
  const [restart, setRestart] = useState(false);
  const [error, setError] = useState(false);

  const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const testWinner = (test, who) => {
    for (let i = 0; i < winningCombos.length; i++) {
      const results = winningCombos[i].filter((val) => test.includes(val));
      if (results.length === 3) {
        setEnd(new Date().getTime());
        setWinner(who);
        console.log(who, "won");
        return true;
      }
      // return false;
    }
  };

  const computerMove = (usedBoxes) => {
    const remaining = BOXES.filter(
      (val) => !usedBoxes.includes(val) && !compBox.includes(val)
    );
    const random = Math.floor(Math.random() * remaining.length);
    setCompBox([...compBox, remaining[random]]);
    console.log("computer", remaining[random]);
    return testWinner([...compBox, remaining[random]], "computer");
  };

  const handleClick = (e) => {
    const num = Number(e.target.id);
    if (userBox.includes(num) || compBox.includes(num) || num === 0) {
      setError(true);
    } else {
      console.log("user", num);
      setUserBox([...userBox, num]);
      // if (userMove === "O") {
      if (!testWinner([...userBox, num], "user")) {
        computerMove([...userBox, num]);
      }
    }
    // }
    // if (userMove === "X") {
    // if (!testWinner([...userBox, num], "user")) {
    //   computerMove([...userBox, num]);
    // }
    // }
  };

  const userSelection = (childData) => {
    switch (childData) {
      case "First (O)":
        setUserMove("O");
        // setCompMove("X");
        break;
      case "Second (X)":
        setUserMove("X");
        computerMove(userBox);
        // setCompMove("O");
        break;
      default:
        break;
    }
    setRestart(false);
    setStart(new Date().getTime());
  };

  const resetGame = (childData) => {
    if (childData) {
      setUserBox([]);
      setCompBox([]);
      setStart(0);
      setEnd(0);
      setWinner("");
      setUserMove("");
      setRestart(true);
    }
  };

  return (
    <div className="container">
      <OXModal restart={restart} userSelection={userSelection} />
      <GameOver
        start={start}
        end={end}
        winner={winner}
        resetGame={resetGame}
        showLeaderboard={showLeaderboard}
      />
      <Modal show={error} onHide={() => setError(false)}>
        <Modal.Header closeButton>
          <Modal.Body>
            <strong>You can't select a box that's already been used!</strong>{" "}
            <br />
            <i>tsk tsk shame on you</i>
          </Modal.Body>
        </Modal.Header>
      </Modal>
      {BOXES.map((index) => {
        return (
          <div
            key={index}
            id={index}
            className={
              userBox.includes(index) || compBox.includes(index)
                ? "box used"
                : "box unused"
            }
            onClick={handleClick}
          >
            <div
              style={{
                display:
                  userBox.includes(index) || compBox.includes(index)
                    ? "block"
                    : "none",
              }}
              // when is it x, if the user picks x and the computer did not select it, user picks o and the computer selected it
              // when is it o, if the user picks o and the computer did not select it, user picks x and the computer selected it
              className={
                (userMove === "X" && !compBox.includes(index)) ||
                (userMove === "O" && compBox.includes(index))
                  ? "exes"
                  : "ohs"
              }
            ></div>
          </div>
        );
      })}
      {winner === "" &&
      BOXES.filter((val) => !userBox.includes(val) && !compBox.includes(val))
        .length === 0 ? (
        <GameOver
          start={start}
          end={new Date().getTime()}
          winner={"tied"}
          resetGame={resetGame}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Game;
