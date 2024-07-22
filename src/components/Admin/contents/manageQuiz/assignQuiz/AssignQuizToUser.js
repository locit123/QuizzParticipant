import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { postAssignQuizToUser } from "../../../../../api/apiQuiz/fetchApiQuiz";
import { getAllParticipant } from "../../../../../api/apiParticipants/fetchApiParticipants";
import _ from "lodash";
const AssignQuizToUser = ({ listDataQuiz }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [listDataUsers, setListDataUsers] = useState([]);
  const [dataSelectQuiz, setDataSelectQuiz] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await getAllParticipant(setListDataUsers);
  };
  const getQuiz = useCallback(async () => {
    let dataCloneQuiz = _.cloneDeep(listDataQuiz);
    dataCloneQuiz = dataCloneQuiz?.map((item) => {
      return {
        value: item.id,
        label: `${item.id} - ${item.name}`,
      };
    });
    setDataSelectQuiz(dataCloneQuiz);
  }, [listDataQuiz]);
  useEffect(() => {
    getQuiz();
  }, [getQuiz]);

  const handleClickAssignUser = async () => {
    await postAssignQuizToUser(
      selectedQuiz.value,
      selectedUser.value,
      setSelectedQuiz,
      setSelectedUser
    );
  };
  return (
    <div className="content-assignQuiz">
      <div className="row mb-3">
        <div className="col-6">
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={dataSelectQuiz}
            placeholder={"choose quizId"}
          />
        </div>
        <div className="col-6">
          <Select
            value={selectedUser}
            onChange={setSelectedUser}
            options={listDataUsers}
            placeholder={"choose userId"}
          />
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-warning" onClick={handleClickAssignUser}>
          Assign User
        </button>
      </div>
    </div>
  );
};

export default AssignQuizToUser;
