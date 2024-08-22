import { toast } from "react-toastify";
import { typeActionPostLogin } from "../../store/auth/postLogin/actions";
import { fetchApiAuth } from "../fetchApi";
import { typeActionPostRegister } from "../../store/auth/postRegister/actions";

const postLogin = async (dispatch, data, setIsLoading, navigate) => {
  dispatch(typeActionPostLogin.fetchPostLoginRequest());
  setIsLoading(true);
  const res = await fetchApiAuth.login(data);
  if (res?.EC === 0 && res?.DT) {
    toast.success(res?.EM);
    dispatch(typeActionPostLogin.fetchPostLoginSuccess(res?.DT));
    setIsLoading(false);
    navigate("/");
  } else {
    toast.error(res?.EM);
    dispatch(typeActionPostLogin.fetchPostLoginFailed(res));
    setIsLoading(false);
  }
};

const postRegister = async (dispatch, data, setIsLoading, navigate) => {
  dispatch(typeActionPostRegister.fetchPostRegisterRequest());
  setIsLoading(true);
  const res = await fetchApiAuth.register(data);
  if (res?.EC === 0) {
    dispatch(typeActionPostRegister.fetchPostRegisterSuccess(res));
    toast.success(res?.EM);
    setIsLoading(false);
    navigate("/login");
  } else {
    dispatch(typeActionPostRegister.fetchPostRegisterFailed(res));
    toast.error(res?.EM);
    setIsLoading(false);
  }
};
const postLogout = async (dispatch, email, refresh_token, navigate) => {
  const data = { email, refresh_token };
  const res = await fetchApiAuth.logout(data);
  if (res && res.EC === 0) {
    dispatch(typeActionPostLogin.userLogout());
    navigate("/login");
  }
};
const getDashBoard = async (setDataDashBoard) => {
  const res = await fetchApiAuth.dashBoard();
  if (res && res.EC === 0) {
    setDataDashBoard(res.DT);
  } else {
    setDataDashBoard([]);
  }
};
export { postLogin, postRegister, postLogout, getDashBoard };
