import React, { useEffect, useState } from "react";

const ContentRight = ({ data, handleClickFinish, setIndex }) => {
  const [count, setCount] = useState(300);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  useEffect(() => {
    if (count === 0) {
      handleClickFinish();
      return;
    }
    let timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count, handleClickFinish]);

  var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  const getClassQuestion = (item, index) => {
    let baseClass = "question";
    if (item && item.answers.length > 0) {
      let check = item.answers.some((item) => item.isSelected === true);
      if (check) {
        baseClass += " clickCheckbox";
      }
    }
    if (index === selectedQuestionIndex) {
      baseClass += " clickQuestion";
    }
    return baseClass;
  };

  const handleClickClass = (index) => {
    setSelectedQuestionIndex(index);
    setIndex(index);
  };
  return (
    <>
      <div className="time">{toHHMMSS(count)}</div>
      <div className="main-question">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className={getClassQuestion(item, index)}
                onClick={() => handleClickClass(index)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ContentRight;
