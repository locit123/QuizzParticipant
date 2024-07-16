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
  console.log(res, "[REGISTER]");
};

export { postLogin, postRegister };
