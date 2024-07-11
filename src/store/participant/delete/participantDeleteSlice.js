import { getType } from "../../../utils/typeAction";
import { typeActionDeleteParticipant } from "./actions";

export const initState = {
  isLoadingDeleteParticipant: false,
  isErrorDeleteParticipant: null,
  dataDeleteParticipant: null,
};

const participantDeleteSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionDeleteParticipant.fetchDeleteParticipantRequest):
      return {
        ...state,
        isLoadingDeleteParticipant: true,
        isErrorDeleteParticipant: null,
        dataDeleteParticipant: null,
      };
    case getType(typeActionDeleteParticipant.fetchDeleteParticipantSuccess):
      return {
        ...state,
        isLoadingDeleteParticipant: false,
        isErrorDeleteParticipant: null,
        dataDeleteParticipant: action.payload,
      };
    case getType(typeActionDeleteParticipant.fetchDeleteParticipantFailed):
      return {
        ...state,
        isLoadingDeleteParticipant: false,
        isErrorDeleteParticipant: action.payload,
        dataDeleteParticipant: null,
      };

    default:
      return state;
  }
};

export default participantDeleteSlice;
