import { createActions } from "redux-actions";

export const typeActionPostRegister = createActions({
  fetchPostRegisterRequest: undefined,
  fetchPostRegisterSuccess: (payload) => payload,
  fetchPostRegisterFailed: (payload) => payload,
});
