import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizByParticipant } from "../../api/apiQuiz/fetchApiQuiz";
import { getQuizByParticipantState } from "../../store/selector";
import LoadingQuizUser from "./LoadingQuizUser";
import "./User.scss";
const User = () => {
  const dispatch = useDispatch();
  const getQuiz = useSelector(getQuizByParticipantState);
  const { dataGetQuizByParticipant } = getQuiz;

  const getApiQuiz = useCallback(async () => {
    await getQuizByParticipant(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getApiQuiz();
  }, [getApiQuiz]);

  return (
    <div className="quiz-by-participant container">
      {dataGetQuizByParticipant && dataGetQuizByParticipant?.length > 0
        ? dataGetQuizByParticipant?.map((item, index) => (
            <LoadingQuizUser key={index} item={item} index={index} />
          ))
        : "Your Quiz is not available ..."}
    </div>
  );
};

export default User;
