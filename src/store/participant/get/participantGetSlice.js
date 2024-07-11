import { getType } from "../../../utils/typeAction";
import { typeActionGetParticipant } from "./actions";

export const initState = {
  isLoadingGetParticipant: false,
  isErrorGetParticipant: null,
  dataGetParticipant: null,
};

const participantGetSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionGetParticipant.fetchGetParticipantRequest):
      return {
        ...state,
        isLoadingGetParticipant: true,
        isErrorGetParticipant: null,
        dataGetParticipant: null,
      };
    case getType(typeActionGetParticipant.fetchGetParticipantSuccess):
      return {
        ...state,
        isLoadingGetParticipant: false,
        isErrorGetParticipant: null,
        dataGetParticipant: action.payload,
      };
    case getType(typeActionGetParticipant.fetchGetParticipantFailed):
      return {
        ...state,
        isLoadingGetParticipant: false,
        isErrorGetParticipant: action.payload,
        dataGetParticipant: null,
      };

    default:
      return state;
  }
};

export default participantGetSlice;
