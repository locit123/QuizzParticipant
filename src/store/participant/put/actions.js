import { createActions } from "redux-actions";

export const typeActionPutParticipant = createActions({
  fetchPutParticipantRequest: undefined,
  fetchPutParticipantSuccess: (payload) => payload,
  fetchPutParticipantFailed: (payload) => payload,
});
