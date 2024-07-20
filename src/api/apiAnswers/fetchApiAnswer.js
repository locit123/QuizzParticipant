import { toast } from "react-toastify";
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

const postAnswer = async (description, correct_answer, question_id) => {
  const data = { description, correct_answer, question_id };
  const res = await fetchApiAnswer.postA(data);
  if (res && res?.EC === 0) {
    toast.success(res.EM);
  } else {
    toast.error(res.EM);
  }
};
export { postFinishAnswer, postAnswer };
