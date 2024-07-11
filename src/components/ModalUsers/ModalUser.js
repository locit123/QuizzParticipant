import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  emailState,
  passwordState,
  roleState,
  statusModalUserState,
  userImageState,
  usernameState,
} from "../../store/selector";
import FormModalUser from "../form/FormModalUser/FormModalUser";
import Button from "react-bootstrap/Button";
import {
  destroyParticipant,
  postParticipant,
  putParticipant,
} from "../../api/apiParticipants/fetchApiParticipants";
function ModalUser({ handleClose, show, currentPage, limit }) {
  const statusState = useSelector(statusModalUserState);
  const userItem = statusState[1];
  const dispatch = useDispatch();
  const email = useSelector(emailState);
  const password = useSelector(passwordState);
  const username = useSelector(usernameState);
  const role = useSelector(roleState);
  const userImage = useSelector(userImageState);
  const handleClickSave = async (e) => {
    e.preventDefault();
    if (statusState[0] === "create") {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("role", role);
      formData.append("userImage", userImage);
      await postParticipant(
        dispatch,
        formData,
        handleClose,
        currentPage,
        limit
      );
    }
    if (statusState[0] === "delete") {
      await destroyParticipant(
        dispatch,
        userItem.id,
        handleClose,
        currentPage,
        limit
      );
    }
    if (statusState[0] === "update") {
      const data = new FormData();
      data.append("id", userItem);
      data.append("username", username);
      data.append("role", role);
      data.append("userImage", userImage);
      await putParticipant(dispatch, data, currentPage, limit, handleClose);
    }
  };
  return (
    <>
      <Modal
        size="lg"
        show={show}
        backdrop="static"
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {statusState[0] === "create"
              ? "Create User"
              : statusState[0] === "delete"
              ? "Delete User"
              : statusState[0] === "update"
              ? "Update User"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {statusState[0] === "create" ? (
            <FormModalUser />
          ) : statusState[0] === "delete" ? (
            <div>
              <span>Bạn có chắc chắn là muốn xóa người dùng </span>
              <span
                style={{ fontSize: "1.2rem", color: "red", fontWeight: "bold" }}
              >
                {userItem.email}
              </span>
              <span> này không?</span>
            </div>
          ) : statusState[0] === "update" ? (
            <FormModalUser />
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickSave}>
            {statusState[0] === "create"
              ? "create"
              : statusState[0] === "delete"
              ? "delete"
              : statusState[0] === "update"
              ? "update"
              : ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
