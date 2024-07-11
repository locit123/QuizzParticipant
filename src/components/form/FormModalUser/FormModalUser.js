import React, { useState } from "react";
import Form from "../Form";
import Select from "../../../select/Select";
import { useDispatch, useSelector } from "react-redux";
import ConvertToBase from "../../../utils/convertToBase64";
import {
  emailState,
  passwordState,
  roleState,
  statusModalUserState,
  userImageState,
  usernameState,
} from "../../../store/selector";
import { typeActionValueFormUser } from "../../../store/valueForm/valueUser/actions";

const FormModalUser = () => {
  const [image, setImage] = useState(null);
  const email = useSelector(emailState);
  const password = useSelector(passwordState);
  const username = useSelector(usernameState);
  const role = useSelector(roleState);
  const userImage = useSelector(userImageState);
  const dispatch = useDispatch();
  const statusState = useSelector(statusModalUserState);
  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(typeActionValueFormUser.setUserImage(file));

      const base64 = await ConvertToBase.getBase64(file);
      setImage(base64);
    } else {
      setImage(null);
    }
  };
  return (
    <div>
      <Form
        disabled={statusState[0] === "update" ? true : false}
        id={"email"}
        label={"Email"}
        placeholder={"Enter value email..."}
        type={"email"}
        value={email}
        onChange={(e) =>
          dispatch(typeActionValueFormUser.setEmail(e.target.value))
        }
      />
      <Form
        disabled={statusState[0] === "update" ? true : false}
        id={"password"}
        label={"Password"}
        placeholder={"Enter value password..."}
        type={"text"}
        value={password}
        onChange={(e) =>
          dispatch(typeActionValueFormUser.setPassword(e.target.value))
        }
      />
      <Form
        id={"username"}
        label={"UserName"}
        placeholder={"Enter value username..."}
        type={"text"}
        value={username}
        onChange={(e) =>
          dispatch(typeActionValueFormUser.setUserName(e.target.value))
        }
      />
      <Select
        id={"role"}
        label={"Role"}
        value={role}
        onChange={(e) =>
          dispatch(typeActionValueFormUser.setRole(e.target.value))
        }
      >
        <option value={"USER"}>User</option>
        <option value={"ADMIN"}>Admin</option>
      </Select>
      <Form
        id={"userImage"}
        label={"Image"}
        type={"file"}
        onChange={handleChangeFile}
      />
      <div
        className="mt-3 mb-3"
        style={{
          height: "200px",
          border: "1px",
          borderStyle: "dashed",
          borderColor: "red",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {image || userImage ? (
          <img
            style={{ maxWidth: "100%", maxHeight: "100%", textAlign: "center" }}
            src={image ? image : userImage}
            alt="anh"
          />
        ) : (
          <span>Preview</span>
        )}
      </div>
    </div>
  );
};

export default FormModalUser;
