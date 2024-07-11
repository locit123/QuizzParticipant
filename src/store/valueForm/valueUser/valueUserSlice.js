import { getType } from "../../../utils/typeAction";
import { typeActionValueFormUser } from "./actions";

export const initState = {
  email: "",
  password: "",
  username: "",
  role: "USER",
  userImage: "",
};

const valueUserSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionValueFormUser.setEmail):
      return {
        ...state,
        email: action.payload,
      };
    case getType(typeActionValueFormUser.setPassword):
      return {
        ...state,
        password: action.payload,
      };
    case getType(typeActionValueFormUser.setUserName):
      return {
        ...state,
        username: action.payload,
      };
    case getType(typeActionValueFormUser.setRole):
      return {
        ...state,
        role: action.payload,
      };
    case getType(typeActionValueFormUser.setUserImage):
      return {
        ...state,
        userImage: action.payload,
      };

    default:
      return state;
  }
};
export default valueUserSlice;
