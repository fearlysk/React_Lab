import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
  const user = localStorage.getItem("user-data");
  return user;
};

function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
