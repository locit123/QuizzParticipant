import { createActions } from "redux-actions";

export const typeActionDeleteParticipant = createActions({
  fetchDeleteParticipantRequest: undefined,
  fetchDeleteParticipantSuccess: (payload) => payload,
  fetchDeleteParticipantFailed: (payload) => payload,
});
