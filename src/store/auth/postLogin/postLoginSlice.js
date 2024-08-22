import { getType } from "../../../utils/typeAction";
import { typeActionPostLogin } from "./actions";

export const initState = {
  isLoadingPostLogin: false,
  isErrorPostLogin: null,
  dataPostLogin: null,
};

const postLoginSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionPostLogin.fetchPostLoginRequest):
      return {
        ...state,
        isLoadingPostLogin: true,
        isErrorPostLogin: null,
        dataPostLogin: null,
      };
    case getType(typeActionPostLogin.fetchPostLoginSuccess):
      return {
        ...state,
        isLoadingPostLogin: false,
        isErrorPostLogin: null,
        dataPostLogin: action.payload,
      };
    case getType(typeActionPostLogin.fetchPostLoginFailed):
      return {
        ...state,
        isLoadingPostLogin: false,
        isErrorPostLogin: action.payload,
        dataPostLogin: null,
      };
    case getType(typeActionPostLogin.userLogout): {
      return {
        ...state,
        isLoadingPostLogin: false,
        isErrorPostLogin: null,
        dataPostLogin: null,
      };
    }
    default:
      return state;
  }
};

export default postLoginSlice;
