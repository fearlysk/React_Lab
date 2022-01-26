import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectUser } from "../redux/userSlice";

const useAuth = () => {
  const user = useSelector(selectUser);
  return Object.keys(user).length;
};

function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
