import { getType } from "../../../utils/typeAction";
import { typeActionCreateParticipant } from "./actions";

export const initState = {
  isLoadingParticipant: false,
  isErrorParticipant: null,
  dataParticipant: null,
};

const participantCreateSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionCreateParticipant.fetchCreateParticipantRequest):
      return {
        ...state,
        isLoadingParticipant: true,
        isErrorParticipant: null,
        dataParticipant: null,
      };
    case getType(typeActionCreateParticipant.fetchCreateParticipantSuccess):
      return {
        ...state,
        isLoadingParticipant: false,
        isErrorParticipant: null,
        dataParticipant: action.payload,
      };
    case getType(typeActionCreateParticipant.fetchCreateParticipantFailed):
      return {
        ...state,
        isLoadingParticipant: false,
        isErrorParticipant: action.payload,
        dataParticipant: null,
      };
    default:
      return state;
  }
};

export default participantCreateSlice;
