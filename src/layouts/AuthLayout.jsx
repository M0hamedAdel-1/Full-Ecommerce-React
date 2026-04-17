import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/context/Auth";
import { ThreeDot } from "react-loading-indicators";

const AuthLayout = () => {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <ThreeDot variant="pulsate" color="#e1a10b" size="medium" />
      </div>
    );
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  if (!user) <Navigate to="/signin" replace />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
