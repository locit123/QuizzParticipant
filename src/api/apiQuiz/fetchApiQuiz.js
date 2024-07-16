import { typeActionGetQuizByParticipant } from "../../store/quiz/QuizByParticipant/actions";
import { typeActionQuizWithQuestion } from "../../store/quiz/QuizWithQuestion/actions";
import { fetchApiQuiz } from "../fetchApi";

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
export { getQuizByParticipant, getQuizWithQuestion };
