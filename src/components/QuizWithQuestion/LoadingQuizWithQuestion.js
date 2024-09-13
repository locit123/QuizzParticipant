import React from "react";

const LoadingQuizWithQuestion = ({ data, index, handleFindCheckbox }) => {
  const handleChangeCheckbox = (e, aId, qId) => {
    handleFindCheckbox(aId, qId);
  };

  return (
    <>
      <div className="img mb-3">
        {data?.imageFile && (
          <img
            src={`data:image/jpeg;base64,${data.imageFile}`}
            alt="img"
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      <div className="quiz-content-question mb-3">
        Question {index + 1} : {data?.description}
      </div>
      <div className="quiz-content-answer">
        <div className="answer">
          {data?.answers &&
            data?.answers.length > 0 &&
            data?.answers.map((item, index) => {
              return (
                <div key={index} className="answer-question">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={(e) => handleChangeCheckbox(e, item.id, data.id)}
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default LoadingQuizWithQuestion;
