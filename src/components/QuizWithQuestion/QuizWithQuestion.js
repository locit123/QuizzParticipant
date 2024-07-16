import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizWithQuestion } from "../../api/apiQuiz/fetchApiQuiz";
import { useDispatch, useSelector } from "react-redux";
import "./QuizWithQuestion.scss";
import { quizWithQuestionState } from "../../store/selector";
import LoadingQuizWithQuestion from "./LoadingQuizWithQuestion";
import _ from "lodash";
const QuizWithQuestion = () => {
  const location = useLocation();
  const stateQuizWithQuestion = useSelector(quizWithQuestionState);
  console.log(stateQuizWithQuestion, "state");
  const { dataQuizWithQuestion } = stateQuizWithQuestion;
  const [index, setIndex] = useState(0);
  const [newData, setNewData] = useState([]);
  const data = dataQuizWithQuestion?.qa;

  useEffect(() => {
    if (dataQuizWithQuestion?.qa) {
      const mappedData = dataQuizWithQuestion.qa.map((item) => {
        return {
          ...item,
          answers: item.answers.map((item2) => ({
            ...item2,
            isSelected: false,
          })),
        };
      });
      setNewData(mappedData);
    }
  }, [dataQuizWithQuestion]);

  const paramsId = useParams();
  const quizId = paramsId?.id;
  const dispatch = useDispatch();
  const getApi = useCallback(async () => {
    await getQuizWithQuestion(dispatch, quizId);
  }, [dispatch, quizId]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  const handleClickPrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleClickNext = () => {
    if (data && data.length > index + 1) setIndex(index + 1);
  };

  const handleFindCheckbox = (aId, qId) => {
    console.log(aId, qId);

    const dataClone = _.cloneDeep(newData);
    console.log(dataClone, "DATA CLONE");
    const clone = dataClone.find((item) => item.id === qId);
    if (clone && clone.answers) {
      const a = clone.answers.map((answers) => {
        if (answers.id === aId) {
          answers.isSelected = !answers.isSelected;
        }
        return answers;
      });
      clone.answers = a;
    }
    const index = dataClone.findIndex((item) => item.id === qId);
    console.log(index, "INDEX");
    if (index > -1) {
      dataClone[index] = clone;
      setNewData(dataClone);
    }
  };
  return (
    <div className="layout-quiz-with-question container">
      <div className="box-left">
        <h1>
          Quiz {quizId} {location.state.title}
        </h1>
        <div className="quiz-content">
          <LoadingQuizWithQuestion
            data={newData ? newData[index] : []}
            index={index}
            handleFindCheckbox={handleFindCheckbox}
          />
        </div>
        <div className="quiz-footer text-center">
          {index === 0 ? (
            <button className="btn btn-primary" onClick={handleClickNext}>
              NEXT
            </button>
          ) : index + 1 < newData?.length ? (
            <>
              <button className="btn btn-secondary" onClick={handleClickPrev}>
                PREV
              </button>
              <button className="btn btn-primary" onClick={handleClickNext}>
                NEXT
              </button>
            </>
          ) : (
            newData?.length === index + 1 && (
              <button className="btn btn-secondary" onClick={handleClickPrev}>
                PREV
              </button>
            )
          )}
        </div>
      </div>
      <div className="box-right">b</div>
    </div>
  );
};

export default QuizWithQuestion;
