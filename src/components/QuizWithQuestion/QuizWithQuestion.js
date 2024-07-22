import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizWithQuestion } from "../../api/apiQuiz/fetchApiQuiz";
import { useDispatch, useSelector } from "react-redux";
import "./QuizWithQuestion.scss";
import { quizWithQuestionState } from "../../store/selector";
import LoadingQuizWithQuestion from "./LoadingQuizWithQuestion";
import _ from "lodash";
import { postFinishAnswer } from "../../api/apiAnswers/fetchApiAnswer";
import ModalFinish from "./ModalFinish";
const QuizWithQuestion = () => {
  const location = useLocation();
  const paramsId = useParams();

  const stateQuizWithQuestion = useSelector(quizWithQuestionState);
  const [listDataQuizWithQuestion, setListDataQuizWithQuestion] = useState([]);
  const { dataQuizWithQuestion } = stateQuizWithQuestion;
  const [index, setIndex] = useState(0);
  const [newData, setNewData] = useState([]);
  const [dataModalResult, setDataModalResult] = useState({});
  const [show, setShow] = useState(false);
  const quizId = paramsId?.id;
  const dispatch = useDispatch();
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

  const getApi = useCallback(async () => {
    await getQuizWithQuestion(dispatch, quizId, setListDataQuizWithQuestion);
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
  const handleClickFinish = async () => {
    const payload = { quizId: +quizId, answers: [] };
    let answers = [];
    if (newData && data.length > 0) {
      newData.forEach((item) => {
        let questionId = item.id;
        let userAnswerId = [];
        item.answers.forEach((item) => {
          if (item.isSelected === true) {
            userAnswerId.push(item.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId,
        });
      });
      payload.answers = answers;
    }

    //Show finish
    await postFinishAnswer(payload, setDataModalResult, setShow);
  };

  const handleFindCheckbox = (aId, qId) => {
    const dataClone = _.cloneDeep(newData);
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
          {/* {newData.length === 1 ? (
            <>
              <button className="btn btn-primary" onClick={handleClickNext}>
                NEXT
              </button>
              <button className="btn btn-warning" onClick={handleClickFinish}>
                Finish
              </button>
            </>
          ) : newData.length > 1 ? (
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
              <>
                <button className="btn btn-secondary" onClick={handleClickPrev}>
                  PREV
                </button>
                <button className="btn btn-warning" onClick={handleClickFinish}>
                  Finish
                </button>
              </>
            )
          )} */}
        </div>
        <ModalFinish
          show={show}
          setShow={setShow}
          dataModalResult={dataModalResult}
        />
      </div>
      <div className="box-right">b</div>
    </div>
  );
};

export default QuizWithQuestion;
