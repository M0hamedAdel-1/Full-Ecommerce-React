import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosSunny } from "react-icons/io";

import "./themeicon.css";
import { ThemeContext } from "../context/ThemeContext";
const ThemeIcon = () => {
    const themeref = useRef(null);

    const { setTheme } = useContext(ThemeContext);
  
    const [showTheme, setShowTheme] = useState(false);
  useEffect(() => {


      const handleClickOutside = (e) => {
        
  
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
  return (
    <div className="icon_container">

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
          </div>
  );
};

export default ThemeIcon;
