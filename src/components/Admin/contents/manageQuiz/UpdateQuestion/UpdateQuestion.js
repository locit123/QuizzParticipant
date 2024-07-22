import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { LuImagePlus, LuBadgePlus } from "react-icons/lu";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import Lightbox from "react-awesome-lightbox";
import "./UpdateQuestion.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  getQuizWithQuestion,
  postUpsertQuizWithQuestion,
} from "../../../../../api/apiQuiz/fetchApiQuiz";
import { convertBase64ToFile } from "../../../../../utils/convertBase64ToFiles";
import ConvertToBase from "../../../../../utils/convertToBase64";
const UpdateQuestion = ({ listDataQuiz }) => {
  const [dataImage, setDataImage] = useState({
    url: "",
    title: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const initState = [
    {
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
    },
  ];
  const [listDataQuestion, setListDataQuestion] = useState(initState);
  const [listDataOption, setListDataOption] = useState([]);
  const dispatch = useDispatch();
  const [listDataQuizWithQuestion, setListDataQuizWithQuestion] = useState([]);
  useEffect(() => {
    if (listDataQuiz.length > 0 && listDataQuiz) {
      let dataClone = _.cloneDeep(listDataQuiz);
      let newDataClone = dataClone.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListDataOption(newDataClone);
    }
  }, [listDataQuiz]);

  const getApiQuiz = useCallback(async () => {
    await getQuizWithQuestion(
      dispatch,
      selectedOption?.value,
      setListDataQuizWithQuestion
    );
  }, [dispatch, selectedOption?.value]);
  useEffect(() => {
    if (selectedOption && selectedOption.value) {
      getApiQuiz();
    }
  }, [selectedOption, getApiQuiz]);

  const showQuizWithQuestion = useCallback(() => {
    setListDataQuestion(listDataQuizWithQuestion.qa);
  }, [listDataQuizWithQuestion]);

  const showImage = useCallback(async () => {
    let q = [];
    for (let i = 0; i < listDataQuizWithQuestion?.qa?.length; i++) {
      let data = listDataQuizWithQuestion.qa[i];
      if (data?.imageFile) {
        let file = await convertBase64ToFile(
          `data:image/png;base64,${data.imageFile}`,
          `quiz with question ${data.id}`,
          "image/png"
        );

        if (file) {
          data.imageFile = file;
          data.imageName = file.name;
        } else {
          console.log("err convert base64 to file");
        }
      }
      q.push(data);
    }

    setListDataQuestion(q);
  }, [listDataQuizWithQuestion]);

  useEffect(() => {
    showQuizWithQuestion();
    showImage();
  }, [showQuizWithQuestion, showImage]);

  const handleClickAddQuestionAndAnswer = (type, qId) => {
    if (type === "QUESTION") {
      let newDataQuestion = {
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
      setListDataQuestion([...listDataQuestion, newDataQuestion]);
    }
    if (type === "ANSWERS") {
      let dataClone = _.cloneDeep(listDataQuestion);
      dataClone = dataClone.filter((item) => item.id !== qId);
      setListDataQuestion(dataClone);
    }
  };

  const handleClickAnswer = (type, qId, aId) => {
    let dataClone = _.cloneDeep(listDataQuestion);
    if (type === "ADD_ANSWER") {
      let index = dataClone.findIndex((i) => i.id === qId);
      let newAnswer = {
        id: uuidv4(),
        isCorrect: false,
        description: "",
      };
      if (index > -1) {
        dataClone[index].answers.push(newAnswer);
        setListDataQuestion(dataClone);
      }
    }
    if (type === "REMOVE_ANSWER") {
      let index = dataClone.findIndex((i) => i.id === qId);
      if (index > -1) {
        dataClone[index].answers = dataClone[index].answers.filter(
          (item) => item.id !== aId
        );
        setListDataQuestion(dataClone);
      }
    }
  };

  const handleChangeDescription = (value, qId) => {
    let dataClone = _.cloneDeep(listDataQuestion);
    let index = dataClone.findIndex((item) => item.id === qId);
    if (index > -1) {
      dataClone[index].description = value;
      setListDataQuestion(dataClone);
    }
  };

  const handleChangeFile = (value, qId) => {
    let dataClone = _.cloneDeep(listDataQuestion);
    let index = dataClone.findIndex((item) => item.id === qId);
    if (value && index > -1) {
      dataClone[index].imageFile = value;
      dataClone[index].imageName = value.name;
      setListDataQuestion(dataClone);
    }
  };

  const handleChangeAnswer = (value, qId, aId, type) => {
    let dataClone = _.cloneDeep(listDataQuestion);
    let index = dataClone.findIndex((item) => item.id === qId);
    if (index > -1) {
      dataClone[index].answers = dataClone[index].answers.map((answer) => {
        if (answer.id === aId) {
          if (type === "CHECKBOX") {
            console.log(value);
            answer.isCorrect = value;
          }
          if (type === "DESCRIPTION") {
            console.log(value);
            answer.description = value;
          }
        }
        return answer;
      });
      setListDataQuestion(dataClone);
    }
  };

  const handleClickImage = (id) => {
    let dataClone = _.cloneDeep(listDataQuestion);
    let index = dataClone.findIndex((item) => item.id === id);
    if (index > -1) {
      setDataImage({
        url: URL.createObjectURL(dataClone[index].imageFile),
        title: dataClone[index].imageName,
      });
    }
    setIsOpen(true);
  };

  const handleClickUpdateQuestion = async () => {
    let isValid = true;

    if (_.isEmpty(selectedOption)) {
      toast.error("Vui lòng choose 1 bai quiz trước khi update");
      isValid = false;
      return;
    }

    listDataQuestion.forEach((item, q) => {
      if (!item.description) {
        toast.error(`Vui lòng nhập câu hỏi ${q + 1}`);
        isValid = false;
        return;
      }

      const hasInvalidAnswer = item.answers.some((answer, a) => {
        if (!answer.description) {
          toast.error(
            `Vui lòng nhập đáp án cho câu trả lời ${a + 1} trong Câu hỏi ${
              q + 1
            }`
          );
          isValid = false;
          return true; // Điều này chỉ thoát khỏi vòng lặp `some`, không phải `forEach`
        }

        return false;
      });

      if (hasInvalidAnswer) {
        return; // Điều này chỉ thoát khỏi vòng lặp hiện tại, không phải toàn bộ vòng lặp
      }
      let filterItemAnswer = item.answers.filter((f) => f.isCorrect);
      if (filterItemAnswer.length === 0) {
        toast.error(`Câu hỏi ${q + 1} của bạn phải có ít nhất 1 đáp án đúng `);
        isValid = false;
        return;
      }

      return isValid;
    });

    if (isValid) {
      const dataClone = _.cloneDeep(listDataQuestion);
      for (let i = 0; i < dataClone.length; i++) {
        if (dataClone[i].imageFile) {
          let fileImage = dataClone[i].imageFile;
          const fileBase64 = await ConvertToBase.getBase64(fileImage);
          if (fileBase64) {
            dataClone[i].imageFile = fileBase64;
          }
        }
      }
      const data = {
        quizId: selectedOption.value,
        questions: dataClone,
      };
      await postUpsertQuizWithQuestion(
        data,
        setSelectedOption,
        setListDataQuestion
      );
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
    <div className="content-manage-question">
      <span className="mb-3">select Quizzes</span>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={listDataOption}
        placeholder={"choose quizzes"}
        styles={customStyles}
      />
      <div className="box-content mt-3">
        <span className="mt-3 mb-3">
          {listDataQuestion?.length > 0 && "Add Question"}
        </span>
        {listDataQuestion?.length > 0 ? (
          listDataQuestion.map((item, index) => {
            return (
              <div key={index}>
                <div className="box">
                  <FloatingLabel
                    label={`Description Question ${index + 1}`}
                    className="mb-3 fl"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      value={item.description}
                      onChange={(e) =>
                        handleChangeDescription(e.target.value, item.id)
                      }
                    />
                  </FloatingLabel>
                  <label htmlFor={item.id}>
                    <LuImagePlus className="ic-image" />
                  </label>
                  <input
                    type="file"
                    id={item.id}
                    hidden
                    onChange={(e) =>
                      handleChangeFile(e.target.files[0], item.id)
                    }
                  />
                  <span>
                    {item.imageName ? (
                      <div
                        onClick={() => handleClickImage(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.imageName}
                      </div>
                    ) : (
                      "0 files upload"
                    )}
                  </span>
                  <div className="box-ic">
                    <LuBadgePlus
                      className="ic-plus"
                      onClick={() =>
                        handleClickAddQuestionAndAnswer("QUESTION")
                      }
                    />
                    {listDataQuestion.length > 1 && (
                      <BsFillPatchMinusFill
                        className="ic-minus"
                        onClick={() =>
                          handleClickAddQuestionAndAnswer("ANSWERS", item.id)
                        }
                      />
                    )}
                  </div>
                </div>
                {item.answers.map((answer, index) => {
                  return (
                    <div className="box2" key={index}>
                      <input
                        type="checkbox"
                        style={{ width: "25px", height: "25px" }}
                        className="fl"
                        checked={answer.isCorrect}
                        onChange={(e) =>
                          handleChangeAnswer(
                            e.target.checked,
                            item.id,
                            answer.id,
                            "CHECKBOX"
                          )
                        }
                      />
                      <FloatingLabel
                        label={`Description Answer ${index + 1}`}
                        className="mb-3 fl"
                      >
                        <Form.Control
                          type="text"
                          placeholder="name@example.com"
                          value={answer.description}
                          onChange={(e) =>
                            handleChangeAnswer(
                              e.target.value,
                              item.id,
                              answer.id,
                              "DESCRIPTION"
                            )
                          }
                        />
                      </FloatingLabel>
                      <div>
                        <FaRegPlusSquare
                          className="ic-plus"
                          onClick={() =>
                            handleClickAnswer("ADD_ANSWER", item.id, answer.id)
                          }
                        />
                        {item.answers.length > 1 && (
                          <FaRegMinusSquare
                            className="ic-minus"
                            onClick={() =>
                              handleClickAnswer(
                                "REMOVE_ANSWER",
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
          })
        ) : (
          <div>No data update</div>
        )}
      </div>
      <div>
        {listDataQuestion?.length > 0 && (
          <button
            onClick={handleClickUpdateQuestion}
            className="btn btn-warning"
          >
            Update Question
          </button>
        )}
      </div>
      {isOpen && (
        <Lightbox
          image={dataImage.url}
          onClose={() => setIsOpen(false)}
          title={dataImage.title}
        />
      )}
    </div>
  );
};

export default UpdateQuestion;
