import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/ContextApi";

const PrivateRoute = ({ children, publicPage }) => {
  const { token } = useStoreContext();

  // Login/Register are public pages.
  // If already logged in, don't allow user to open them.
  if (publicPage) {
    return token ? <Navigate to="/dashboard" replace /> : children;
  }

  // Dashboard is protected.
  // If there is no JWT token, send user to login.
  return !token ? <Navigate to="/login" replace /> : children;
};

export default PrivateRoute;