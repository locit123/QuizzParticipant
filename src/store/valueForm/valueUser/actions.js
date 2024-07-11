import { createActions } from "redux-actions";

export const typeActionValueFormUser = createActions({
  setEmail: (payload) => payload,
  setPassword: (payload) => payload,
  setUserName: (payload) => payload,
  setRole: (payload) => payload,
  setUserImage: (payload) => payload,
});
