import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { userVerify } from "../services/Apis";
import "../styles/login.css";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (!otp) return toast.error("Enter your OTP");
    if (!/^\d+$/.test(otp)) return toast.error("OTP must be numeric");
    if (otp.length < 6) return toast.error("OTP must be 6 digits");

    try {
      const response = await userVerify({
        otp,
        email: location.state,
      });

      if (response.status === 200) {
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("userdbtoken", response.data.userToken);

        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "OTP verification failed"
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-overlay">
        {/* Left Section */}
        <div className="login-left">
          <h1>Verify OTP</h1>
          <p>
            A one-time password has been sent to your registered email
            address. Please enter it below to complete verification.
          </p>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <h2>OTP Verification</h2>

          <form onSubmit={LoginUser}>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />

            <button type="submit">Verify OTP</button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Otp;
