import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../components/context/Auth";

const ProtectedRoute = () => {
  const location = useLocation();
  const { user, userLoading } = useAuth();

  if (!user && !userLoading) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
