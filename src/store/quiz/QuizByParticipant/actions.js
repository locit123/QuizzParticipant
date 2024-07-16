import { createActions } from "redux-actions";

export const typeActionGetQuizByParticipant = createActions({
  fetchQuizByParticipantRequest: undefined,
  fetchQuizByParticipantSuccess: (payload) => payload,
  fetchQuizByParticipantFailed: (payload) => payload,
});
