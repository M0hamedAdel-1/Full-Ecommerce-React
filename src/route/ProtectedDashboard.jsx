import React from 'react'
import { useAuth } from '../components/context/Auth';
import { ThreeDot } from 'react-loading-indicators';
import { Outlet, replace, useNavigate } from 'react-router-dom';
import "../components/navbar/navbar.css"
const ProtectedDashboard = () => {
    const navigate = useNavigate()
      const { user, userLoading } = useAuth();
    
      if (userLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <ThreeDot variant="pulsate" color="#e1a10b" size="medium" />
      </div>
    );
  }
    if (!user || !user.role === "admin"){
         return navigate("/signin",replace)
    } 
  return (
    <Outlet/>
  )
}

export default ProtectedDashboard
