import { typeActionGetQuizByParticipant } from "../../store/quiz/actions";
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
export { getQuizByParticipant };
