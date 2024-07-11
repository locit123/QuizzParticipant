import { STATUS_MODAL_USER } from "../../../utils/contant";

export const initState = {
  statusModal: ["create"],
};

const modalUserSlice = (state = initState, action) => {
  switch (action.type) {
    case STATUS_MODAL_USER:
      return {
        ...state,
        statusModal: action.payload,
      };
    default:
      return state;
  }
};

export default modalUserSlice;
