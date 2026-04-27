import React, { useEffect, useRef, useState } from "react";
import "./ProfileIcon.css";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ProfileIcon = () => {
      const { user, setuser } = useAuth();
      const navigate = useNavigate();
//   const [active, setActive] = useState(false);

      const profileref = useRef(null);
    
      const [showprofile, setShowprofile] = useState(false);
    



       useEffect(() => {
         const handleClickOutside = (e) => {
           // profile
           if (profileref.current && !profileref.current.contains(e.target)) {
             setShowprofile(false);
           }

         };
     
         document.addEventListener("mousedown", handleClickOutside);
     
         return () => {
           document.removeEventListener("mousedown", handleClickOutside);
         };
       }, []);

        const handleLogOut = () => {
    Cookies.remove("user");
    setuser(null);
    navigate("/signin");
    toast.success("Logged out successfully");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="profile_container">
      <div
        ref={profileref}
        className="icon icon_profile"
        onClick={(e) => {
          e.stopPropagation();
          setShowprofile(!showprofile);
        }}
      >
        {/* <CgProfile/> */}
        {user ? (
          <img src={user?.image} alt="profile" className="profile_avatar" />
        ) : (
          <CgProfile />
        )}

        <div className={`profile ${showprofile ? "show" : ""}`}>
          <button onClick={handleProfile}>Profile</button>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
