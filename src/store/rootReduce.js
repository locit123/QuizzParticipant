import { combineReducers } from "redux";
import modalUserSlice from "./Modals/ModalUser/modalUserSlice";
import participantCreateSlice from "./participant/create/participantCreateSlice";
import participantGetSlice from "./participant/get/participantGetSlice";
import participantDeleteSlice from "./participant/delete/participantDeleteSlice";
import valueUserSlice from "./valueForm/valueUser/valueUserSlice";
import putParticipantSlice from "./participant/put/putParticipantSlice";
import postLoginSlice from "./auth/postLogin/postLoginSlice";
import getQuizByParticipantSlice from "./quiz/getQuizByParticipantSlice";

const rootReducer = combineReducers({
  modalUser: modalUserSlice,
  createParticipant: participantCreateSlice,
  getParticipant: participantGetSlice,
  deleteParticipant: participantDeleteSlice,
  valueFormUser: valueUserSlice,
  putParticipant: putParticipantSlice,
  login: postLoginSlice,
  getQuizByParticipant: getQuizByParticipantSlice,
});

export default rootReducer;
