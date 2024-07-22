import React, { useState } from "react";
import "./ManageQuizzes.scss";
import ModalQuiz from "./ModalQuiz/ModalQuiz";
import TableLayoutQuiz from "../TableLayout/TableLayoutQuiz";
import Accordion from "react-bootstrap/Accordion";
import AssignQuizToUser from "./assignQuiz/AssignQuizToUser";
import UpdateQuestion from "./UpdateQuestion/UpdateQuestion";
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
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Manage Quizzes</Accordion.Header>
        <Accordion.Body>
          <div className="add-new-quiz mb-3">
            <button className="btn btn-primary" onClick={handleClickAddNewQuiz}>
              Add New Quiz
            </button>
          </div>
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
          <div className="content-quizzes">
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
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="mt-3 mb-3">
        <Accordion.Header>Update Question</Accordion.Header>
        <Accordion.Body>
          <UpdateQuestion listDataQuiz={listDataQuiz} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Assign Quizzes To Users</Accordion.Header>
        <Accordion.Body>
          <AssignQuizToUser
            listDataQuiz={listDataQuiz}
            setListDataQuiz={setListDataQuiz}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ManageQuizzes;
