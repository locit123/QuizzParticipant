import { typeActionCreateParticipant } from "../../store/participant/create/actions";
import { typeActionDeleteParticipant } from "../../store/participant/delete/actions";
import { typeActionGetParticipant } from "../../store/participant/get/actions";
import { typeActionPutParticipant } from "../../store/participant/put/actions";
import { fetchApiParticipants } from "../fetchApi";
import { toast } from "react-toastify";
const postParticipant = async (dispatch, data, handleClose, page, limit) => {
  dispatch(typeActionCreateParticipant.fetchCreateParticipantRequest());
  const res = await fetchApiParticipants.postP(data);
  if (res?.EC === 0 && res?.DT) {
    toast.success(res?.EM);
    dispatch(
      typeActionCreateParticipant.fetchCreateParticipantSuccess(res?.DT)
    );
    handleClose();
    await getParticipant(dispatch, page, limit);
  } else {
    dispatch(typeActionCreateParticipant.fetchCreateParticipantFailed(res));
    toast.error(res?.EM);
  }
};

const getParticipant = async (dispatch, page, limit) => {
  dispatch(typeActionGetParticipant.fetchGetParticipantRequest());
  const res = await fetchApiParticipants.getP(page, limit);
  if (res?.EC === 0 && res?.DT) {
    dispatch(typeActionGetParticipant.fetchGetParticipantSuccess(res?.DT));
  } else {
    dispatch(typeActionGetParticipant.fetchGetParticipantSuccess(res));
  }
};

const destroyParticipant = async (dispatch, id, handleClose, page, limit) => {
  dispatch(typeActionDeleteParticipant.fetchDeleteParticipantRequest());
  const res = await fetchApiParticipants.deleteP(id);
  if (res?.EC === 0 && res?.DT) {
    toast.success(res?.EM);
    dispatch(
      typeActionDeleteParticipant.fetchDeleteParticipantSuccess(res?.DT)
    );
    handleClose();
    await getParticipant(dispatch, page, limit);
  } else {
    toast.error(res?.EM);
    dispatch(typeActionDeleteParticipant.fetchDeleteParticipantFailed(res));
  }
};

const putParticipant = async (dispatch, data, page, limit, handleClose) => {
  dispatch(typeActionPutParticipant.fetchPutParticipantRequest());
  const res = await fetchApiParticipants.putP(data);
  if (res?.EC === 0 && res?.DT) {
    dispatch(typeActionPutParticipant.fetchPutParticipantSuccess(res?.DT));
    toast.success(res?.EM);
    handleClose();
    await getParticipant(dispatch, page, limit);
  } else {
    toast.error(res?.EM);
    dispatch(typeActionPutParticipant.fetchPutParticipantFailed(res));
  }
};

const getAllParticipant = async (setListDataUsers) => {
  const res = await fetchApiParticipants.getPA();
  if (res && res?.EC === 0) {
    let newDataUsers = res?.DT.map((item) => {
      return {
        value: item.id,
        label: `${item.id} - ${item.username} - ${item.email}`,
      };
    });
    setListDataUsers(newDataUsers);
  } else {
    setListDataUsers([]);
  }
};
export {
  postParticipant,
  getParticipant,
  destroyParticipant,
  putParticipant,
  getAllParticipant,
};
