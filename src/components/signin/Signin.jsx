import React, { useState } from "react";
import "./signin.css";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";

import { axiosInstance } from "../../config/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// cookies
import Cookies from "js-cookie";
import { useAuth } from "../context/Auth";

const Signin = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  // to show password
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [isloading, setIsloading] = useState(false);
  const { setuser } = useAuth();

  const submitLogin = async () => {
    const { email, password } = loginForm;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
      toast.error("please fill all fields");

      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("enter valid email");

      return;
    }
    if (password.length < 8) {
      toast.error("password should be 8 charter at least");

      return;
    }

    try {
      setIsloading(true);
      const response = await axiosInstance.post("/account/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        toast.success("Login Is Successfully", {
          toasterId: "bottom-right",
        });
        Cookies.set("user", JSON.stringify(response.data), {
          expires: 3,
          secure: true,
          sameSite: "strict",
        });
        setuser(response.data);
        navigate("/", { replace: true });
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e.message || "Invalid email or password");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="sign_in ">
        <img
          data-aos="fade-left"
          className="one"
          src="../../../imgs/circle.svg"
        />
        <img
          data-aos="fade-left"
          className="two"
          src="../../../imgs/square.svg"
        />

        <div className="form-container" data-aos="fade-right">
          <h1>
            Welcome to kiosk <span>kids</span>
          </h1>

          <div className="input_group">
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />
          </div>
          <div className="input_group">
            <label htmlFor="password">password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye"
            >
              {showPassword ? <LuEyeClosed /> : <FaEye />}
            </span>
          </div>

          <Link to="/forgetPassword">forget password?</Link>

          <button
            className="btn_signin"
            disabled={isloading}
            onClick={submitLogin}
          >
            sign in
          </button>
          {/* <div className="or_div">
            <hr />
            <span>or</span>
            <hr />
          </div> */}

          {/* <button className="btn_google">
            <img src="/imgs/google.svg" /> continue with google
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Signin;
