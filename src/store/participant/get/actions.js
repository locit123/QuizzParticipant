import { createActions } from "redux-actions";

export const typeActionGetParticipant = createActions({
  fetchGetParticipantRequest: undefined,
  fetchGetParticipantSuccess: (payload) => payload,
  fetchGetParticipantFailed: (payload) => payload,
});
