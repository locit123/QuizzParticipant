/*************************************PARTICIPANT *********************************/
export const statusModalUserState = (state) => state.modalUser.statusModal;
export const createParticipantState = (state) => state.createParticipant;
export const getParticipantState = (state) => state.getParticipant;
export const deleteParticipantState = (state) => state.deleteParticipant;
export const putParticipantState = (state) => state.putParticipant;
export const formDataState = (state) => state.createParticipant.formData;
//value
export const emailState = (state) => state.valueFormUser.email;
export const passwordState = (state) => state.valueFormUser.password;
export const usernameState = (state) => state.valueFormUser.username;
export const roleState = (state) => state.valueFormUser.role;
export const userImageState = (state) => state.valueFormUser.userImage;
/*************************************AUTH *********************************/
export const loginState = (state) => state.login;
export const tokenState = (state) => state.login?.dataPostLogin?.access_token;
export const email_state = (state) => state.login?.dataPostLogin?.email;
export const refresh_token_state = (state) =>
  state.login?.dataPostLogin?.refresh_token;
export const registerState = (state) => state.register;
/*************************************QUIZ *********************************/
export const getQuizByParticipantState = (state) => state.getQuizByParticipant;
export const quizWithQuestionState = (state) => state.quizWithQuestion;
