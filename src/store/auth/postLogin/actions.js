import { createActions } from "redux-actions";

export const typeActionPostLogin = createActions({
  fetchPostLoginRequest: undefined,
  fetchPostLoginSuccess: (payload) => payload,
  fetchPostLoginFailed: (payload) => payload,
});
