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

const getQuizWithQuestion = async (
  dispatch,
  id,
  setListDataQuizWithQuestion
) => {
  dispatch(typeActionQuizWithQuestion.fetchQuizWithQuestionRequest());
  const res = await fetchApiQuiz.getQWQ(id);
  if (res && res?.EC === 0) {
    dispatch(typeActionQuizWithQuestion.fetchQuizWithQuestionSuccess(res?.DT));
    setListDataQuizWithQuestion(res?.DT);
  } else {
    dispatch(typeActionQuizWithQuestion.fetchQuizWithQuestionFailed(res));
  }
};

const postQuiz = async (
  description,
  name,
  difficulty,
  quizImage,
  handleClose,
  setListDataQuiz
) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);
  if (!description || !name) {
    toast.error("Your Description/Name ,Please");
    return;
  }
  const res = await fetchApiQuiz.postQ(formData);
  if (res && res.EC === 0) {
    toast.success(res.EM);
    handleClose();
    await getQuizAll("all", setListDataQuiz);
  } else {
    toast.error(res.EM);
  }
};

const getQuizAll = async (payload, setListDataQuiz) => {
  const res = await fetchApiQuiz.getQA(payload);
  if (res && res?.EC === 0) {
    setListDataQuiz(res?.DT);
  } else {
    setListDataQuiz([]);
  }
};

const deleteQuiz = async (id, handleClose, payload, setListDataQuiz) => {
  const res = await fetchApiQuiz.deleteQ(id);
  if (res && res?.EC === 0) {
    toast.success(res?.EM);
    handleClose();
    await getQuizAll(payload, setListDataQuiz);
  } else {
    toast.error(res?.EM);
  }
};

const putQuiz = async (
  id,
  description,
  name,
  difficulty,
  quizImage,
  handleClose,
  setListDataQuiz
) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);

  const res = await fetchApiQuiz.putQ(formData);
  if (res && res?.EC === 0) {
    toast.success(res?.EM);
    handleClose();
    await getQuizAll("all", setListDataQuiz);
  } else {
    toast.error(res?.EM);
  }
};

const postAssignQuizToUser = async (
  quizId,
  userId,
  setSelectedQuiz,
  setSelectedUser
) => {
  const data = { quizId, userId };
  const res = await fetchApiQuiz.postA_Q_T_U(data);
  if (res && res?.EC === 0) {
    toast.success(res?.EM);
    setSelectedQuiz(null);
    setSelectedUser(null);
  } else {
    toast.error(res?.EM);
  }
};

const postUpsertQuizWithQuestion = async (
  data,
  setSelectedOption,
  setListDataQuestion
) => {
  const res = await fetchApiQuiz.postU_S_Q_W_Q(data);
  if (res && res?.EC === 0) {
    toast.success(res?.EM);
    setSelectedOption(null);
    setListDataQuestion([]);
  } else {
    toast.error(res?.EM);
  }
};
export {
  getQuizByParticipant,
  getQuizWithQuestion,
  postQuiz,
  getQuizAll,
  deleteQuiz,
  putQuiz,
  postAssignQuizToUser,
  postUpsertQuizWithQuestion,
};
