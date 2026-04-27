import React, { useEffect, useState } from "react";
import "./profile.css";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import { axiosInstance } from "../../config/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../components/context/Auth";
const Profile = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setloading] = useState(false);
  const [profileform, setprofileform] = useState({
    firstName: "",
    secondName: "",
    phone: "",
    address: "",
    image: null,
    imagePreview: null,
  });

  // Load user data from cookies
  const usercookiestr = Cookies.get("user");
  const userobj = JSON.parse(usercookiestr);
  const { setuser } = useAuth();

  useEffect(() => {
    if (userobj) {
      setprofileform({
        ...userobj,
        imagePreview: userobj.image || null,
      });
    }
  }, []);
  // Text inputs handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setprofileform((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSameData = Object.entries(userobj).every(
      ([key, value]) => profileform[key] === value,
    );

    if (isSameData) {
      toast.success("No Change in your information");
      return;
    }

    try {
      setloading(true);
      const formData = new FormData();
      formData.append("firstName", profileform.firstName);
      formData.append("secondName", profileform.secondName);
      formData.append("phone", profileform.phone);
      formData.append("address", profileform.address);
      formData.append("id", profileform.id);
      if (profileform.image instanceof File) {
        formData.append("image", profileform.image);
      } else {
        formData.append("image", profileform.imagePreview);
      }

      const response = await axiosInstance.put(
        "/account/update-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      const phoneRegex = /^01[0125][0-9]{8}$/;
      if (response.status === 200) {
        if (
          profileform.firstName.length < 3 ||
          profileform.secondName.length < 3
        ) {
          toast.error(
            "not valid first and last name must be at least 3 charter",
          );
          return;
        }
        if (!phoneRegex.test(profileform.phone)) {
          toast.error("please enter valid phone");
          return;
        }

        Cookies.set("user", JSON.stringify(response.data), {
          expires: 3,
          secure: true,
          sameSite: "strict",
        });
        setuser(response.data);
      }
    } catch (e) {
      toast.error("Update failed:", e.response?.data || e.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="profile">
      <div className="container">
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

        <div className="form-wrapper">
          <h1 className="title">Profile Info</h1>

          <form>
            {/* First & Second Name */}
            <div className="row">
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  value={profileform.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder=" "
                />
                <label className="input-label">First Name</label>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="secondName"
                  value={profileform.secondName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder=" "
                />
                <label className="input-label">Second Name</label>
              </div>
            </div>

            {/* Phone */}
            <div className="input-group">
              <input
                type="tel"
                name="phone"
                value={profileform.phone}
                onChange={handleChange}
                className="input-field"
                placeholder=" "
              />
              <label className="input-label">Phone</label>
            </div>

            {/* Address */}
            <div className="input-group">
              <input
                type="text"
                name="address"
                value={profileform.address}
                onChange={handleChange}
                className="input-field"
                placeholder=" "
              />
              <label className="input-label">Address</label>
            </div>

            {/* Profile Image */}
            <div className="input-group">
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setprofileform((prev) => ({
                      ...prev,
                      image: file,
                      imagePreview: URL.createObjectURL(file),
                    }));
                    setShowPreview(false);
                  }
                }}
                className="input-field input-with-icons"
              />

              
              <label className="input-label">Profile Image</label>

              <div className="input-icons">
                {/* Show Preview */}
                <button
                  type="button"
                  className="icon-btn view-btn"
                  onClick={() => setShowPreview(true)}
                >
                  <FaEye />
                </button>

                {/* Delete Image */}
                <button
                  type="button"
                  className="icon-btn delete-btn"
                  onClick={() =>
                    setprofileform((prev) => ({
                      ...prev,
                      image: null,
                      imagePreview: null,
                    }))
                  }
                >
                  <MdDelete />
                </button>
              </div>


            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              onClick={handleSubmit}
              type="submit"
              className="submit-btn"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>

      {showPreview && profileform.imagePreview && (
        <div
          className="image-modal-overlay"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="modal-close-btn"
              onClick={() => setShowPreview(false)}
            >
              <IoMdClose size={28} color="#ff4444" />
            </button>

            {/* Image */}
            <img
              src={profileform.imagePreview}
              alt="Profile Preview"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
