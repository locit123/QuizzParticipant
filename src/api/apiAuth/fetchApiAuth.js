import { toast } from "react-toastify";
import { typeActionPostLogin } from "../../store/auth/postLogin/actions";
import { fetchApiAuth } from "../fetchApi";

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

export { postLogin };
