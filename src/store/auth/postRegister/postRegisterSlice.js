import { getType } from "../../../utils/typeAction";
import { typeActionPostRegister } from "./actions";

export const initState = {
  isLoadingPostRegister: false,
  isErrorPostRegister: null,
  dataPostRegister: null,
};

const postRegisterSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionPostRegister.fetchPostRegisterRequest):
      return {
        ...state,
        isLoadingPostRegister: true,
        isErrorPostRegister: null,
        dataPostRegister: null,
      };
    case getType(typeActionPostRegister.fetchPostRegisterSuccess):
      return {
        ...state,
        isLoadingPostRegister: false,
        isErrorPostRegister: null,
        dataPostRegister: action.payload,
      };
    case getType(typeActionPostRegister.fetchPostRegisterFailed):
      return {
        ...state,
        isLoadingPostRegister: false,
        isErrorPostRegister: action.payload,
        dataPostRegister: null,
      };

    default:
      return state;
  }
};

export default postRegisterSlice;
