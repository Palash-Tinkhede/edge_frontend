import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerfunction } from "../services/Apis";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/login.css"; // reuse same CSS as login

const Register = () => {
  const [passhow, setPassShow] = useState(false);
  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
useEffect(() => {
    const token = localStorage.getItem("userdbtoken")
    if (token) navigate("/")
  }, [navigate])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata;

    if (!fname) return toast.error("Enter your name");
    if (!email) return toast.error("Enter your email");
    if (!email.includes("@")) return toast.error("Enter valid email");
    if (!password) return toast.error("Enter your password");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      const response = await registerfunction(inputdata);
      if (response.status === 200) {
        setInputdata({ fname: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Registration failed"
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-overlay">
        {/* Left Section */}
        <div className="login-left">
          <h1>Create Account</h1>
          <p>
            Join Zeus to manage your platform, access services, and explore
            powerful tools designed for scalability.
          </p>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <h2>Sign up</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fname"
              placeholder="Full Name"
              value={inputdata.fname}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={inputdata.email}
              onChange={handleChange}
            />

            <div className="password-field">
              <input
                type={passhow ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={inputdata.password}
                onChange={handleChange}
              />
              <span onClick={() => setPassShow(!passhow)}>
                {passhow ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit">Sign up</button>
          </form>

          <div className="login-links">
            <NavLink to="/login">Already have an account? Sign in</NavLink>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
