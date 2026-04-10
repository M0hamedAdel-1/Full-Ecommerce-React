import React, { useState } from "react";
import "./signup.css";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [signupform, setSignupform] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    password: "",
    confirmedPassword: "",
    address: "",
    image: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showconPassword, setconShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const submitsignup = async () => {
    
    const {
      firstName,
      secondName,
      email,
      phone,
      password,
      confirmedPassword,
      address,
      image,
    } = signupform;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{11}$/;

    if (
      !firstName ||
      !secondName ||
      !email ||
      !phone ||
      !password ||
      !confirmedPassword ||
      !address ||
      !image
    ) {
      toast.error("please fill all fields");
      return;
    }

    if (firstName.length < 3 || secondName.length < 3) {
      toast.error("not valid first and last name must be at least 3 charter");
    }

    if (!emailRegex.test(email)) {
      toast.error("not valid mail");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("please enter valid phone");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmedPassword) {
      toast("Passwords do not match");
      return;
    }
    if (!image) {
      toast("Please upload a profile image");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(signupform).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // console.log(formData);
      

      setIsloading(true);
      const response = await axiosInstance.post("/account/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Register Is Successful", {
          toasterId: "bottom-right",
        });
        // otp verification navigate to
        navigate("/verify", {
          replace: true,
          state: { email: signupform.email },
        });

        toast.success("Account created successfully, please verify your email");
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      // console.log(e.message)
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="signup" >
        <img data-aos="fade-left" className="one" src="../../../imgs/circle.svg" />
        <img data-aos="fade-left" className="two" src="../../../imgs/square.svg" />
      <div className="form-container" data-aos="fade-right">
        <h1>
          Welcome to Kids <span>Kiosk</span>
        </h1>

        <div className="form-row">
          <div className="input_group">
            <label htmlFor="firstName">first name</label>
            <input
              onChange={(e) =>
                setSignupform({ ...signupform, firstName: e.target.value })
              }
              id="firstName"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="input_group">
            <label htmlFor="secondName">Second name</label>

            <input
              onChange={(e) =>
                setSignupform({ ...signupform, secondName: e.target.value })
              }
              id="secondName"
              type="text"
              placeholder="Second Name"
            />
          </div>
        </div>

        <div className="input_group">
          <label htmlFor="email">email</label>
          <input
            onChange={(e) =>
              setSignupform({ ...signupform, email: e.target.value })
            }
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="input_group">
          <label htmlFor="phone">phone</label>
          <input
            onChange={(e) =>
              setSignupform({ ...signupform, phone: e.target.value })
            }
            id="phone"
            type="text"
            placeholder="Phone"
          />
        </div>

        <div className="input_group">
          <label htmlFor="password">password</label>
          <input
            onChange={(e) =>
              setSignupform({ ...signupform, password: e.target.value })
            }
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye">
            <FaEye />
          </span>
        </div>

        <div className="input_group">
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            onChange={(e) =>
              setSignupform({
                ...signupform,
                confirmedPassword: e.target.value,
              })
            }
            id="confirmPassword"
            type={showconPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <span
            onClick={() => setconShowPassword(!showconPassword)}
            className="eye"
          >
            <FaEye />
          </span>
        </div>
        <div className="input_group">
          <label htmlFor="address">address</label>
          <input
            onChange={(e) =>
              setSignupform({ ...signupform, address: e.target.value })
            }
            id="address"
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="input_group">
          <label htmlFor="profileImage">profile image</label>
          <input
            onChange={(e) =>
              setSignupform({ ...signupform, image: e.target.files[0] })
            }
            id="profileImage"
            type="file"
          />
        </div>

        <button
          onClick={submitsignup}
          disabled={isloading}
          className="btn-sign-up"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
