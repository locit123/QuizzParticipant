import { fetchApiAnswer } from "../fetchApi";

const postFinishAnswer = async (data, setDataModalResult, setShow) => {
  const res = await fetchApiAnswer.postFA(data);
  if (res?.EC === 0 && res?.DT) {
    setDataModalResult({
      countCorrect: res.DT.countCorrect,
      countTotal: res.DT.countTotal,
      quizData: res.DT.quizData,
    });
    setShow(true);
  } else {
    setDataModalResult({});
  }
};

export { postFinishAnswer };
