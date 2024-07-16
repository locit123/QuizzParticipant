import { createActions } from "redux-actions";

export const typeActionQuizWithQuestion = createActions({
  fetchQuizWithQuestionRequest: undefined,
  fetchQuizWithQuestionSuccess: (payload) => payload,
  fetchQuizWithQuestionFailed: (payload) => payload,
});
