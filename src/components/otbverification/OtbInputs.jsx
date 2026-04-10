import { useRef, useState } from "react";
import { axiosInstance } from "../../config/axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OtbInputs = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading,setloading] = useState(false)

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    // move to next input
    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };
  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };
  // handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

    if (!pasteData) return;

    const newOtp = [...otp];

    pasteData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    // focus last filled input
    const lastIndex = Math.min(pasteData.length - 1, 5);
    inputsRef.current[lastIndex].focus();
  };

  const handleSubmit = async () => {

    const code = otp.join("");
    console.log("OTP Code:", code);

    try {
            setloading(true)

      const email = location.state?.email;
      

      const res = await axiosInstance.post("/account/verify-otp", {
        email: email,
        otp: code,
      });
      toast.success(res.data.message);

      navigate("/signin");

      //  const isVerified = res.data.user.verified;

      // console.log(isVerified);
    } catch (e) {
      toast.error(e.response?.data?.message || "not correct otp");
    }finally{
      setloading(false)
    }
  };
  return (
    <div>
      <div className="verify_inputs" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            maxLength={1}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp_input"
            placeholder="*"
          />
        ))}
      </div>
      <div>
        <p className="receive-code">
          Don't receive code?<button>Resend</button>
        </p>
      </div>

      <button className="btn_verify" disabled={loading} onClick={handleSubmit}>
        Verify
      </button>
    </div>
  );
};

export default OtbInputs;
