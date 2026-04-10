import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/context/Auth";

const AuthLayout = () => {

const {user} = useAuth()

if(user) {
  
  return <Navigate to="/" replace />
}
if(!user) <Navigate to="/signin" replace />




  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
