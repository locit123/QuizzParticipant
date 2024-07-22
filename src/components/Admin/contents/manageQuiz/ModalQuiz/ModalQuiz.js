import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormLayoutQuiz from "../../FormLayout/FormLayoutQuiz";
import {
  deleteQuiz,
  postQuiz,
  putQuiz,
} from "../../../../../api/apiQuiz/fetchApiQuiz";

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
  statusClick,
  setListDataQuiz,
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
    if (statusClick[0] === "create") {
      await postQuiz(
        description,
        name,
        difficulty,
        quizImage,
        handleClose,
        setListDataQuiz,
        "ASSIGN_QUIZ"
      );
    }
    if (statusClick[0] === "delete") {
      await deleteQuiz(statusClick[1], handleClose, "all", setListDataQuiz);
    }
    if (statusClick[0] === "edit") {
      await putQuiz(
        statusClick[1],
        description,
        name,
        difficulty,
        quizImage,
        handleClose,
        setListDataQuiz
      );
    }
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
          {statusClick[0] === "create" || statusClick[0] === "edit" ? (
            <FormLayoutQuiz
              title={
                statusClick[0] === "create"
                  ? "Create Quiz"
                  : statusClick[0] === "edit"
                  ? "Edit Quiz"
                  : ""
              }
              setName={setName}
              setDescription={setDescription}
              setDifficulty={setDifficulty}
              setQuizImage={setQuizImage}
              name={name}
              description={description}
              difficulty={difficulty}
              quizImage={quizImage}
            />
          ) : statusClick[0] === "delete" ? (
            <div>
              <span>
                bạn có chắc chắn là muốn xóa bài quiz <b>{statusClick[2]}</b>{" "}
                này không?
              </span>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickSave}>
            {statusClick[0] === "create"
              ? "Create Quiz"
              : statusClick[0] === "delete"
              ? "Delete Quiz"
              : statusClick[0] === "edit"
              ? "Edit Quiz"
              : ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalQuiz;
