import { useSelector } from "react-redux";
import { tokenState } from "../store/selector";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const token = useSelector(tokenState);

  if (!token) return <Navigate to={"/login"} />;

  return <>{children}</>;
};

export default PrivateRouter;
