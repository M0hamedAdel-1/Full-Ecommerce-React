import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/dashboardComponents/sidebar/Sidebar";
import Navbar from "../components/dashboard/dashboardComponents/navbardashboard/NavbarDashboard";
import NavbarDashboard from "../components/dashboard/dashboardComponents/navbardashboard/NavbarDashboard";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  function toggleShowSidebar() {
    setShowSidebar((prev)=> !prev)
  }



  return (
    <div className="dashboard">
      <div className={`sidebar-container ${showSidebar ? 'showsidebar' : ''}`}>
        <Sidebar setShowSidebar={setShowSidebar} />
      </div>
      <main className="pages">
        <NavbarDashboard toggleShowSidebar={toggleShowSidebar}/>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
