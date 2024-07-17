import React, { useState } from "react";
import "./ManageQuizzes.scss";
import ModalQuiz from "./ModalQuiz/ModalQuiz";
import TableLayoutQuiz from "../TableLayout/TableLayoutQuiz";
import Accordion from "react-bootstrap/Accordion";
const ManageQuizzes = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizImage, setQuizImage] = useState("");
  const [statusClick, setStatusClick] = useState(["create"]);
  const [listDataQuiz, setListDataQuiz] = useState([]);

  const handleClickAddNewQuiz = (e) => {
    e.preventDefault();
    setShow(true);
    setStatusClick(["create"]);
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
      <div className="table-quiz mt-3">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Table Quizzes</Accordion.Header>
            <Accordion.Body>
              <TableLayoutQuiz
                setShow={setShow}
                setStatusClick={setStatusClick}
                listDataQuiz={listDataQuiz}
                setListDataQuiz={setListDataQuiz}
                setName={setName}
                setDescription={setDescription}
                setDifficulty={setDifficulty}
                setQuizImage={setQuizImage}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
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
        statusClick={statusClick}
        setListDataQuiz={setListDataQuiz}
      />
    </div>
  );
};

export default ManageQuizzes;
