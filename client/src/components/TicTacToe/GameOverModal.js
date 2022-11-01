import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const GameOver = ({ start, end, winner, resetGame, showLeaderboard }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };

  const handleRecord = () => {
    setShow(false);
    showLeaderboard(true, (end - start) / 1000);
  };

  const handleReset = () => {
    resetGame(true);
  };

  return (
    <Modal show={end > 0 && show ? true : false} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Game Over!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {winner !== "tied"
          ? winner === "user"
            ? "You won!"
            : "You lost!"
          : "You tied!"}
        <br /> {`That game took ${(end - start) / 1000} seconds`}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ display: winner === "user" ? "block" : "none" }}
          variant="secondary"
          onClick={handleRecord}
        >
          Add to Leaderboard!
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Try Again!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameOver;
