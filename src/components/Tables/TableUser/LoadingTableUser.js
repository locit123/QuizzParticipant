import React from "react";
import { useDispatch } from "react-redux";
import { setStatusModalUser } from "../../../store/Modals/ModalUser/actions";
import { typeActionValueFormUser } from "../../../store/valueForm/valueUser/actions";

const LoadingTableUser = ({ item, setShow }) => {
  const dispatch = useDispatch();
  const handleClickXoa = (e) => {
    e.preventDefault();
    dispatch(setStatusModalUser(["delete", item]));
    setShow(true);
  };
  const handleClickSua = (e) => {
    e.preventDefault();
    setShow(true);
    dispatch(setStatusModalUser(["update", item.id]));
    dispatch(typeActionValueFormUser.setEmail(item.email));
    dispatch(typeActionValueFormUser.setPassword(item.password));
    dispatch(typeActionValueFormUser.setUserName(item.username));
    dispatch(typeActionValueFormUser.setRole(item.role));
    if (item.image) {
      dispatch(
        typeActionValueFormUser.setUserImage(
          `data:image/jpeg;base64,${item.image}`
        )
      );
    }
  };
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{item.id}</td>
      <td>{item.email}</td>
      <td>{item.username}</td>
      <td>{item.role}</td>
      <td>
        {item.image ? (
          <img
            style={{ maxHeight: "100px", maxWidth: "100px" }}
            src={`data:image/jpeg;base64,${item.image}`}
            alt="img"
          />
        ) : (
          "No Image"
        )}
      </td>
      <td>
        <button className="btn btn-secondary">View</button>
        <button className="btn btn-danger mx-3" onClick={handleClickXoa}>
          Xóa
        </button>
        <button className="btn btn-primary" onClick={handleClickSua}>
          Sửa
        </button>
      </td>
    </tr>
  );
};

export default LoadingTableUser;
