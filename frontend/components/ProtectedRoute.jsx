import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useContext(UserContext);

  return token ? <Outlet /> : <Navigate to="/welcome" replace />;
};

export default ProtectedRoute;
