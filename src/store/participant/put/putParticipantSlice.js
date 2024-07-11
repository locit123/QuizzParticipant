import { getType } from "../../../utils/typeAction";
import { typeActionPutParticipant } from "./actions";

export const initState = {
  isLoadingPutParticipant: false,
  isErrorPutParticipant: null,
  dataPutParticipant: null,
};

const putParticipantSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionPutParticipant.fetchPutParticipantRequest):
      return {
        ...state,
        isLoadingPutParticipant: true,
        isErrorPutParticipant: null,
        dataPutParticipant: null,
      };
    case getType(typeActionPutParticipant.fetchPutParticipantSuccess):
      return {
        ...state,
        isLoadingPutParticipant: false,
        isErrorPutParticipant: null,
        dataPutParticipant: action.payload,
      };
    case getType(typeActionPutParticipant.fetchPutParticipantFailed):
      return {
        ...state,
        isLoadingPutParticipant: false,
        isErrorPutParticipant: action.payload,
        dataPutParticipant: null,
      };

    default:
      return state;
  }
};

export default putParticipantSlice;
