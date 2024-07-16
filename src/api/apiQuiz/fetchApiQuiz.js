import { typeActionGetQuizByParticipant } from "../../store/quiz/QuizByParticipant/actions";
import { typeActionQuizWithQuestion } from "../../store/quiz/QuizWithQuestion/actions";
import { fetchApiQuiz } from "../fetchApi";
import { toast } from "react-toastify";
const getQuizByParticipant = async (dispatch) => {
  dispatch(typeActionGetQuizByParticipant.fetchQuizByParticipantRequest());
  const res = await fetchApiQuiz.getQBP();
  if (res && res?.EC === 0) {
    dispatch(
      typeActionGetQuizByParticipant.fetchQuizByParticipantSuccess(res?.DT)
    );
  } else {
    dispatch(typeActionGetQuizByParticipant.fetchQuizByParticipantFailed(res));
  }
};

const getQuizWithQuestion = async (dispatch, id) => {
  dispatch(typeActionQuizWithQuestion.fetchQuizWithQuestionRequest());
  const res = await fetchApiQuiz.getQWQ(id);
  if (res && res?.EC === 0) {
    dispatch(typeActionQuizWithQuestion.fetchQuizWithQuestionSuccess(res?.DT));
  } else {
    dispatch(typeActionQuizWithQuestion.fetchQuizWithQuestionFailed(res));
  }
};

const postQuiz = async (
  description,
  name,
  difficulty,
  quizImage,
  handleClose
) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty?.value);
  formData.append("quizImage", quizImage);
  if (!description || !name) {
    toast.error("Your Description/Name ,Please");
    return;
  }
  const res = await fetchApiQuiz.postQ(formData);
  if (res && res.EC === 0) {
    toast.success(res.EM);
    handleClose();
  } else {
    toast.error(res.EM);
  }
};
export { getQuizByParticipant, getQuizWithQuestion, postQuiz };
