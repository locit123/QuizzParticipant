import { getType } from "../../../utils/typeAction";
import { typeActionGetQuizByParticipant } from "./actions";

export const initState = {
  isLoadingGetQuizByParticipant: false,
  isErrorGetQuizByParticipant: null,
  dataGetQuizByParticipant: null,
};

const getQuizByParticipantSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionGetQuizByParticipant.fetchQuizByParticipantRequest):
      return {
        isLoadingGetQuizByParticipant: true,
        isErrorGetQuizByParticipant: null,
        dataGetQuizByParticipant: null,
      };
    case getType(typeActionGetQuizByParticipant.fetchQuizByParticipantSuccess):
      return {
        isLoadingGetQuizByParticipant: false,
        isErrorGetQuizByParticipant: null,
        dataGetQuizByParticipant: action.payload,
      };
    case getType(typeActionGetQuizByParticipant.fetchQuizByParticipantFailed):
      return {
        isLoadingGetQuizByParticipant: false,
        isErrorGetQuizByParticipant: action.payload,
        dataGetQuizByParticipant: null,
      };

    default:
      return state;
  }
};

export default getQuizByParticipantSlice;
