import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalFinish({ show, setShow, dataModalResult }) {
  const handleClose = () => setShow(false);
  console.log(dataModalResult, "DATA");

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Finish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            total Question : <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            total Correct : <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalFinish;
