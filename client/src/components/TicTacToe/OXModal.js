import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const OXModal = ({ restart, userSelection }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    userSelection("Second (X)");
    setShow(false);
  };
  const handleSelect = (e) => {
    userSelection(e.target.innerText);
    setShow(false);
    console.log(restart);
  };

  // show if page just starts or game is reset, close if hide clicked or something selected
  return (
    <Modal show={restart ? true : show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Tic-Tac-Toe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <strong>Would you like to go first or second?</strong> <br />
        <i>Note: If you don't pick one, you will automatically go second.</i>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSelect}>
          First (O)
        </Button>
        <Button variant="secondary" onClick={handleSelect}>
          Second (X)
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OXModal;
