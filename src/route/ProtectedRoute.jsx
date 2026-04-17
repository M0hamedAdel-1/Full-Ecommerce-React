import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../components/context/Auth";
import { ThreeDot } from "react-loading-indicators";

const ProtectedRoute = () => {
  const location = useLocation();
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <ThreeDot variant="pulsate" color="#e1a10b" size="medium" />
      </div>
    );
  }

  if (!user && !userLoading) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
