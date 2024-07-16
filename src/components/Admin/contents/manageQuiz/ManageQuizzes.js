import React, { useState } from "react";
import "./ManageQuizzes.scss";
import ModalQuiz from "./ModalQuiz/ModalQuiz";
const ManageQuizzes = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizImage, setQuizImage] = useState("");

  const handleClickAddNewQuiz = (e) => {
    e.preventDefault();
    setShow(true);
  };
  return (
    <div className="content-quizzes">
      <div className="title">
        <h1>Manage Quiz</h1>
      </div>
      <div className="add-new-quiz">
        <button className="btn btn-primary" onClick={handleClickAddNewQuiz}>
          Add New Quiz
        </button>
      </div>
      <div className="table-quiz mt-3">TABLE</div>
      <ModalQuiz
        show={show}
        setShow={setShow}
        setName={setName}
        setDescription={setDescription}
        setDifficulty={setDifficulty}
        setQuizImage={setQuizImage}
        name={name}
        description={description}
        difficulty={difficulty}
        quizImage={quizImage}
      />
    </div>
  );
};

export default ManageQuizzes;
