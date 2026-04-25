import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { FaRecordVinyl } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import "./sidebar.css"
import ProfileIcon from '../../../profileIcon/ProfileIcon';
import { useAuth } from '../../../context/Auth';
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import NavbarDashboard from '../navbardashboard/NavbarDashboard';

const Sidebar = ({setShowSidebar}) => {
  
  const location = useLocation()
  const navigate = useNavigate()
  const {user ,setuser } = useAuth()
  const [show ,setshow] = useState(false)
  
  const icons = {
  Home: FaHome,
  Package: LuPackage,
  Grid: AiFillProduct, 
  ShoppingCart: FaRecordVinyl,
  Users: LuUsers,
};
  const links = [
  { name: "Home", path: "/admin/dashboard" ,icon:"Home"  },
  { name: "Products", path: "/admin/products", icon:"Package" },
  { name: "categories", path: "/admin/categories" ,icon:"Grid" },
  { name: "Orders", path: "/admin/orders" ,icon:"ShoppingCart" },
  { name: "users", path: "/admin/users",icon:"Users" },
];
 
    const handleLogOut = () => {
    Cookies.remove("user");
    setuser(null);
    navigate("/signin");
    toast.success("Logged out successfully");
  };
  return (
    <div className="sidebar">

        <Link to="/">
              <h1>kids <span>kiosk</span></h1>
        </Link>
        <ul className='links'>
          {links.map((link,i)=>{
          const Icon = icons[link.icon]
            return <li className={location.pathname === link.path?"active"
            :""}  key={i}>
              <div className='icon'>{Icon && <Icon  />}</div>
              <Link onClick={()=>setShowSidebar(false)}  to={link.path}>{link.name}</Link>
              </li>

            })}
        </ul>

        <div className={`bottom_sidebar`} onClick={()=>setshow(!show)} >

            <div className={`log_out ${show?" show":""}`}>
              <h4 onClick={handleLogOut}>log out</h4>
            </div>
          <img src={user?.image} alt='image'/>
          <div className='content'>
            <h3>{user.firstName} {user.secondName}</h3>
            <p>@{user.email.split("@")[0]}</p>
          </div>
        </div>
    </div>
  )
}

export default Sidebar
