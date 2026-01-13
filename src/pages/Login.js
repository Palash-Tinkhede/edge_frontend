import React, { useEffect, useState } from 'react';

import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { sentOtpFunction } from "../services/Apis";
import Spinner from "react-bootstrap/Spinner";
import "../styles/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    




useEffect(() => {
    const token = localStorage.getItem("userdbtoken")
    if (token) navigate("/")

  }, [navigate])
    const sendOtp = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Enter your email");
            return;
        }
        if (!email.includes("@")) {
            toast.error("Enter a valid email");
            return;
        }

        setSpinner(true);
        const response = await sentOtpFunction({ email });

        if (response.status === 200) {
            setSpinner(false);
            navigate("/user/otp", { state: email });
        } else {
            setSpinner(false);
            toast.error(response.response.data.error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-overlay">
                {/* Left Section */}
                <div className="login-left">
                    <h1>Welcome Back</h1>
                    <p>
                        It is Zoho Edge Unified Solutions, a fully fledge solution for edge computing with virtualization, monitoring and much more if you donot belive then get out
                    </p>

                    <div className="social-icons">
                        <i className="fab fa-facebook-f" />
                        <i className="fab fa-twitter" />
                        <i className="fab fa-google" />
                        <i className="fab fa-instagram" />
                    </div>
                </div>

                {/* Right Section */}
                <div className="login-right">
                    <h2>Sign in</h2>

                    <form onSubmit={sendOtp}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button type="submit" disabled={spinner}>
                            Sign in now
                            {spinner && <Spinner size="sm" animation="border" />}
                        </button>
                    </form>

                    <div className="login-links">
                        <NavLink to="/register">Create an account</NavLink>
                    </div>

                    <p className="terms">
                        By clicking “Sign in now” you agree to
                        <span> Terms of Service </span> & <span> Privacy Policy</span>
                    </p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Login;
