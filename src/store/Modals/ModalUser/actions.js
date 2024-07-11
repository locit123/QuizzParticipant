import { createAction } from "redux-actions";
import { STATUS_MODAL_USER } from "../../../utils/contant";

export const setStatusModalUser = createAction(
  STATUS_MODAL_USER,
  (payload) => payload
);
