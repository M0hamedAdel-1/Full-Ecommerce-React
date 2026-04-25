
import { CiBurger } from "react-icons/ci";
import ProfileIcon from "../../../profileIcon/ProfileIcon";
import ThemeIcon from "../../../themeicon/ThemeIcon";
import "./navbardashboard.css";
import { GiHamburgerMenu } from "react-icons/gi";


const NavbarDashboard = ({toggleShowSidebar}) => {


 
  return (
    <div className="header_dashboard">
       <div className="icon_burger w-fit"
       onClick={toggleShowSidebar}
       >
        <GiHamburgerMenu/>
      </div>
      <div className="icons">

        
        <div className="icon">

        <ThemeIcon/>
        </div>
        <div className="icon">

        <ProfileIcon/>
        </div>

      </div>
    </div>
  );
};

export default NavbarDashboard;
