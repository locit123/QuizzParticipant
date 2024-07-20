import React, { useEffect, useState } from "react";
import "./ManageQuestion.scss";
import Select from "react-select";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { LuImagePlus, LuBadgePlus } from "react-icons/lu";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { SlideshowLightbox } from "lightbox.js-react";
import { getQuizAll } from "../../../../api/apiQuiz/fetchApiQuiz";
import { postQuestion } from "../../../../api/apiQuestion/fetchApiQuestion";
import { postAnswer } from "../../../../api/apiAnswers/fetchApiAnswer";
import { toast } from "react-toastify";
const ManageQuestion = () => {
  const cutString = (str) => {
    return str.length > 20 ? str.slice(0, 20) + "..." : str;
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listDataQuiz, setListDataQuiz] = useState([]);
  const [dataImage, setDataImage] = useState({
    url: "",
    title: "",
  });
  const initState = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isInvalid: false,
      answers: [
        {
          id: uuidv4(),
          isCorrect: false,
          description: "",
        },
      ],
    },
  ];
  const [listAddQuestion, setListAddQuestion] = useState(initState);
  useEffect(() => {
    getQuiz();
  }, []);

  const getQuiz = async () => {
    await getQuizAll("all", setListDataQuiz, "SELECT_OPTION");
  };

  const handleAddAndRemoveQuestions = (type, id) => {
    if (type === "ADD") {
      let newListAddQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            isCorrect: false,
            description: "",
          },
        ],
      };
      setListAddQuestion([...listAddQuestion, newListAddQuestion]);
    }
    if (type === "REMOVE") {
      let dataQuestionClone = _.cloneDeep(listAddQuestion);
      dataQuestionClone = dataQuestionClone.filter((item) => item.id !== id);
      setListAddQuestion(dataQuestionClone);
    }
  };

  const handleAddAndRemoveAnswers = (type, qId, aId) => {
    let cloneData = _.cloneDeep(listAddQuestion);
    if (type === "ADD") {
      let index = cloneData.findIndex((item) => item.id === qId);
      if (index > -1) {
        let answer = {
          id: uuidv4(),
          isCorrect: false,
          description: "",
        };
        cloneData[index].answers.push(answer);
        setListAddQuestion(cloneData);
      }
    }
    if (type === "REMOVE") {
      let index = cloneData.findIndex((item) => item.id === qId);
      if (index > -1) {
        cloneData[index].answers = cloneData[index].answers.filter(
          (item) => item.id !== aId
        );
        setListAddQuestion(cloneData);
      }
    }
  };

  const handleChangeQuestion = (type, qId, value) => {
    if (type === "QUESTION") {
      let dataClone = _.cloneDeep(listAddQuestion);
      let index = dataClone.findIndex((item) => item.id === qId);
      if (index > -1) {
        dataClone[index].description = value;
        dataClone[index].isInvalid = !value;
        setListAddQuestion(dataClone);
      }
    }
  };

  const handleChangeFileQuestion = (qId, value) => {
    let dataClone = _.cloneDeep(listAddQuestion);
    let index = dataClone.findIndex((item) => item.id === qId);
    if (index > -1 && value) {
      dataClone[index].imageFile = value;
      dataClone[index].imageName = value.name;
      setListAddQuestion(dataClone);
    }
  };

  const handChangeInputAnswer = (value, qId, aId, type) => {
    let dataClone = _.cloneDeep(listAddQuestion);
    let index = dataClone.findIndex((item) => item.id === qId);
    if (index > -1) {
      dataClone[index].answers = dataClone[index].answers.map((answer) => {
        if (answer.id === aId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      });
      setListAddQuestion(dataClone);
    }
  };

  const handleClickSave = async (e) => {
    e.preventDefault();
    //valid quiz
    if (_.isEmpty(selectedOption)) {
      toast.error("please choose a quiz");
      return;
    }
    //valid answers
    let invalidAnswer = true;
    let indexQ = 0;
    let indexA = 0;
    for (let i = 0; i < listAddQuestion.length; i++) {
      for (let j = 0; j < listAddQuestion[i].answers.length; j++) {
        if (!listAddQuestion[i].answers[j].description) {
          invalidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (invalidAnswer === false) break;
    }
    if (invalidAnswer === false) {
      toast.error(
        `please is not valid question ${indexQ + 1} and answer ${indexA + 1}`
      );
      return;
    }
    //valid checkbox answer
    let isCheckboxAnswer = true;
    let indexCbAi = 0;
    for (let i = 0; i < listAddQuestion.length; i++) {
      for (let j = 0; j < listAddQuestion[i].answers.length; j++) {
        const itemFilter = listAddQuestion[i].answers.filter(
          (item) => item.isCorrect
        );
        if (itemFilter.length === 0) {
          isCheckboxAnswer = false;
          break;
        }
      }
      indexCbAi = i;
      if (isCheckboxAnswer === false) break;
    }
    if (isCheckboxAnswer === false) {
      toast.error(
        `This question ${
          indexCbAi + 1
        } must require at least one correct answer `
      );
      return;
    }
    //valid question
    let invalidQuestion = true;
    let indexQ1 = 0;
    for (let i = 0; i < listAddQuestion.length; i++) {
      if (!listAddQuestion[i].description) {
        invalidQuestion = false;
        listAddQuestion[i].isInvalid = true;
        indexQ1 = i;
        break;
      }
    }
    if (invalidQuestion === false) {
      toast.error(`please is not valid question${indexQ1 + 1}`);
      return;
    }

    for (const valueQuestion of listAddQuestion) {
      let questionId = await postQuestion(
        selectedOption.value,
        valueQuestion.description,
        valueQuestion.imageFile
      );
      if (questionId) {
        for (const valueAnswers of valueQuestion.answers) {
          await postAnswer(
            valueAnswers.description,
            valueAnswers.isCorrect,
            questionId
          );
        }
      }
    }
    setListAddQuestion(initState);
  };

  const handleClickImage = (id) => {
    let dataClone = _.cloneDeep(listAddQuestion);
    let index = dataClone.findIndex((item) => item.id === id);
    if (index > -1) {
      setDataImage({
        url: URL.createObjectURL(dataClone[index].imageFile),
        title: dataClone[index].imageName,
      });
      setIsOpen(true);
    }
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      color: "gray",
    }),
  };
  return (
    <div className="content-questions">
      <h1 className="title">ManageQuestions</h1>
      <div className="select-quizzes">
        <p>Select Quizzes</p>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={listDataQuiz}
          placeholder={"Choose quizzes..."}
          styles={customStyles}
        />
      </div>
      <div className="add-questions mt-3 mb-5">
        <p>Add Questions</p>
        {listAddQuestion &&
          listAddQuestion?.length > 0 &&
          listAddQuestion?.map((item, index) => {
            return (
              <div key={item.id}>
                <div className="box-content-question">
                  <div className="col-6 box-left">
                    <FloatingLabel
                      label={`Description ${index + 1}`}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        value={item.description}
                        className={`form-control ${
                          item.isInvalid ? "is-invalid" : ""
                        }`}
                        onChange={(e) =>
                          handleChangeQuestion(
                            "QUESTION",
                            item.id,
                            e.target.value
                          )
                        }
                      />
                    </FloatingLabel>
                  </div>
                  <div className="col-6 box-right">
                    <div className="file">
                      <label htmlFor={`${item.id}`}>
                        <LuImagePlus className="ic-image" />
                      </label>
                      <input
                        type="file"
                        id={`${item.id}`}
                        hidden
                        onChange={(e) =>
                          handleChangeFileQuestion(item.id, e.target.files[0])
                        }
                      />
                      <span>
                        {item.imageName ? (
                          <div
                            onClick={() => handleClickImage(item.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {cutString(item.imageName)}
                          </div>
                        ) : (
                          "0 files upload"
                        )}
                      </span>
                    </div>
                    <div className="btn-add">
                      <LuBadgePlus
                        className="ic-plus"
                        onClick={() => handleAddAndRemoveQuestions("ADD")}
                      />
                      {listAddQuestion?.length > 1 && (
                        <BsFillPatchMinusFill
                          className="ic-minus"
                          onClick={() =>
                            handleAddAndRemoveQuestions("REMOVE", item.id)
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
                {item?.answers?.length > 0 &&
                  item.answers.map((answer, answerIndex) => {
                    return (
                      <div className="box-content-answer" key={answer.id}>
                        <input
                          checked={answer.isCorrect}
                          type="checkbox"
                          className="checkbox"
                          onChange={(e) =>
                            handChangeInputAnswer(
                              e.target.checked,
                              item.id,
                              answer.id,
                              "CHECKBOX"
                            )
                          }
                        />
                        <div className="input">
                          <FloatingLabel
                            label={`Answer ${answerIndex + 1}`}
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="name@example.com"
                              value={answer.description}
                              onChange={(e) =>
                                handChangeInputAnswer(
                                  e.target.value,
                                  item.id,
                                  answer.id,
                                  "INPUT"
                                )
                              }
                            />
                          </FloatingLabel>
                        </div>
                        <div className="btn-add-answers">
                          <FaRegPlusSquare
                            className="ic-plus"
                            onClick={() =>
                              handleAddAndRemoveAnswers("ADD", item.id)
                            }
                          />
                          {item.answers.length > 1 && (
                            <FaRegMinusSquare
                              className="ic-minus"
                              onClick={() =>
                                handleAddAndRemoveAnswers(
                                  "REMOVE",
                                  item.id,
                                  answer.id
                                )
                              }
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {dataImage.url && (
          <SlideshowLightbox
            images={[{ src: dataImage.url }]}
            showThumbnails={true}
            open={isOpen}
            lightboxIdentifier="lbox1"
            onClose={() => {
              setIsOpen(false);
            }}
          ></SlideshowLightbox>
        )}
      </div>
      {listAddQuestion && listAddQuestion.length > 0 && (
        <button className="btn btn-primary" onClick={handleClickSave}>
          Save Change
        </button>
      )}
    </div>
  );
};

export default ManageQuestion;
