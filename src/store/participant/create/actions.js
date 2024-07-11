import { createActions } from "redux-actions";

export const typeActionCreateParticipant = createActions({
  fetchCreateParticipantRequest: undefined,
  fetchCreateParticipantSuccess: (payload) => payload,
  fetchCreateParticipantFailed: (payload) => payload,
});
