import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormLayoutQuiz from "../../FormLayout/FormLayoutQuiz";
import { postQuiz } from "../../../../../api/apiQuiz/fetchApiQuiz";

function ModalQuiz({
  show,
  setShow,
  setName,
  setDescription,
  setDifficulty,
  setQuizImage,
  name,
  description,
  difficulty,
  quizImage,
}) {
  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setDifficulty("");
    setQuizImage("");
  };
  const handleClickSave = async (e) => {
    e.preventDefault();
    await postQuiz(description, name, difficulty, quizImage, handleClose);
  };
  return (
    <>
      <Modal
        size={"xl"}
        show={show}
        onHide={handleClose}
        backdrop={"static"}
        className="modal-quiz"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FormLayoutQuiz
            setName={setName}
            setDescription={setDescription}
            setDifficulty={setDifficulty}
            setQuizImage={setQuizImage}
            name={name}
            description={description}
            difficulty={difficulty}
            quizImage={quizImage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalQuiz;
