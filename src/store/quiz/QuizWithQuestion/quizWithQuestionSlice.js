import { getType } from "../../../utils/typeAction";
import { typeActionQuizWithQuestion } from "./actions";

export const initState = {
  isLoadingQuizWithQuestion: false,
  isErrorQuizWithQuestion: null,
  dataQuizWithQuestion: null,
};

const quizWithQuestionSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionQuizWithQuestion.fetchQuizWithQuestionRequest):
      return {
        ...state,
        isLoadingQuizWithQuestion: true,
        isErrorQuizWithQuestion: null,
        dataQuizWithQuestion: null,
      };
    case getType(typeActionQuizWithQuestion.fetchQuizWithQuestionSuccess):
      return {
        ...state,
        isLoadingQuizWithQuestion: false,
        isErrorQuizWithQuestion: null,
        dataQuizWithQuestion: action.payload,
      };
    case getType(typeActionQuizWithQuestion.fetchQuizWithQuestionSuccess):
      return {
        ...state,
        isLoadingQuizWithQuestion: false,
        isErrorQuizWithQuestion: action.payload,
        dataQuizWithQuestion: null,
      };

    default:
      return state;
  }
};

export default quizWithQuestionSlice;
