import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoIosSunny } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";

import "./navbar.css";
import { Authcontext, useAuth } from "../context/Auth";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import toast, { useToaster } from "react-hot-toast";
import Profile from "../../pages/profile/Profile";

const navlinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Favorites", path: "/favorites" },
  { name: "Orders", path: "/orders" },
  { name: "Connect", path: "/contact" },
];
const Navbar = () => {
  const profileref = useRef(null);
  const themeref = useRef(null);
  const location = useLocation();
  const [active, setActive] = useState(false);
  const { user, setuser } = useAuth();
  const { cartitems } = useContext(CartContext);
  const [showTheme, setShowTheme] = useState(false);
  const [showprofile, setShowprofile] = useState(false);
  const navigate = useNavigate();
  // theme dark or light
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // profile
      if (profileref.current && !profileref.current.contains(e.target)) {
        setShowprofile(false);
      }

      // theme
      if (themeref.current && !themeref.current.contains(e.target)) {
        setShowTheme(false);
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

  const [cookieuser, setcookieuser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const userincookies = Cookies.get("user");
    if (userincookies) {
      setcookieuser(JSON.parse(userincookies));
      setloading(false);
    }
  }, []);

  return (
    <>
      <header>
        <div className={`container`}>
          <div className="logo">
            <Link to="/">
              Kiosk <span>Kids</span>
            </Link>
          </div>

          {user ? (
            <div>
              <div className={`all_links  ${active ? "open_menu" : ""}`}>
                <div onClick={() => setActive(false)} className={`close_menu`}>
                  <IoMdClose />
                </div>
                <ul className="links">
                  {navlinks.map(({ name, path }, i) => (
                    <li
                      key={i}
                      className={location.pathname === path ? "active" : ""}
                    >
                      <Link onClick={() => setActive(false)} to={path}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className={"all_icons "}>
                  <div
                    ref={themeref}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTheme(!showTheme);
                    }}
                    className="icon icon_theme"
                  >
                    <IoIosSunny />

                    <div className={`theme ${showTheme ? "show" : ""}`}>
                      <button
                        onClick={() => {
                          setTheme("dark");
                        }}
                      >
                        dark
                      </button>
                      <button
                        onClick={() => {
                          setTheme("light");
                        }}
                      >
                        light
                      </button>
                      <button
                        onClick={() => {
                          setTheme("system");
                        }}
                      >
                        system
                      </button>
                    </div>
                  </div>

                  <div
                    ref={profileref}
                    className="icon icon_profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowprofile(!showprofile);
                    }}
                  >
                    {/* <CgProfile/> */}
                    {loading ? (
                      <CgProfile />
                    ) : user ? (
                      <img
                        src={user.image}
                        alt="profile"
                        className="profile_avatar"
                      />
                    ) : (
                      <CgProfile />
                    )}

                    <div className={`profile ${showprofile ? "show" : ""}`}>
                      <button
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </button>
                      <button onClick={handleLogOut}>Log Out</button>
                    </div>
                  </div>
                  <div className="icon">
                    <NavLink
                      className="cart"
                      to="/cart"
                      onClick={() => setActive(false)}
                    >
                      <FaShoppingCart />
                      <span className="count">{cartitems.length}</span>
                    </NavLink>
                  </div>
                </div>
              </div>

              <div
                onClick={() => {
                  setActive(!active);
                }}
                className="burger_icon"
              >
                <RxHamburgerMenu />
              </div>
            </div>
          ) : location.pathname === "/signin" ? (
            <div>
              <span className="text_account">Don’t have an account? </span>
              <Link className="btns_login_signup" to="/signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <div>
              <span className="text_account">Have an account? </span>
              <Link className="btns_login_signup" to="/signin">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
