import React, { useCallback, useEffect, useState } from "react";
import SliderBar from "./SliderBar";
import "./Admin.scss";
import { ImMenu } from "react-icons/im";
import ModalUser from "../ModalUsers/ModalUser";
import { useDispatch, useSelector } from "react-redux";
import { setStatusModalUser } from "../../store/Modals/ModalUser/actions";
import {
  createParticipantState,
  getParticipantState,
} from "../../store/selector";
import Spinner from "react-bootstrap/Spinner";
import TableUser from "../Tables/TableUser/TableUser";
import { getParticipant } from "../../api/apiParticipants/fetchApiParticipants";
import { typeActionValueFormUser } from "../../store/valueForm/valueUser/actions";
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const [limit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const statusParticipant = useSelector(createParticipantState);
  const getState = useSelector(getParticipantState);
  const { isLoadingGetParticipant } = getState;

  const { isLoadingParticipant } = statusParticipant;
  const handleClose = () => {
    setShow(false);
    dispatch(typeActionValueFormUser.setEmail(""));
    dispatch(typeActionValueFormUser.setPassword(""));
    dispatch(typeActionValueFormUser.setUserName(""));
    dispatch(typeActionValueFormUser.setRole("USER"));
    dispatch(typeActionValueFormUser.setUserImage(""));
  };

  const handleClickShowModal = (e) => {
    e.preventDefault();
    setShow(true);
    dispatch(setStatusModalUser(["create"]));
  };
  const getApiP = useCallback(async () => {
    await getParticipant(dispatch, currentPage, limit);
  }, [dispatch, currentPage, limit]);
  useEffect(() => {
    getApiP();
  }, [getApiP]);
  return (
    <>
      {isLoadingParticipant ? (
        <div
          style={{
            position: "fixed",
            zIndex: "1031",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="admin-container">
          <div className="admin_slider">
            <SliderBar collapsed={collapsed} />
          </div>
          <div className="admin-content px-3">
            <div className="im-menu">
              <ImMenu
                className="ic-menu"
                style={{ cursor: "pointer" }}
                size={25}
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
            <div className="context mt-3">
              <button
                className="btn btn-primary"
                onClick={handleClickShowModal}
              >
                Add New Users
              </button>
            </div>
            <ModalUser
              show={show}
              handleClose={handleClose}
              currentPage={currentPage}
              limit={limit}
            />
            {isLoadingGetParticipant ? (
              <div
                style={{
                  position: "fixed",
                  zIndex: "1031",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Spinner animation="border" />
              </div>
            ) : (
              <TableUser
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setShow={setShow}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
