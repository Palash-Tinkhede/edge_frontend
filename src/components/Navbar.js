// components/Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gitlogo from './gitlogo.png';
const Navbar = ({ activeItem, user }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    let username = "hacker"
    if (localStorage.getItem("user") != ""){
    username = localStorage.getItem("user")
    }

    return (
        <div className="h-14 dark:bg-gray-800  dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-40 w-full">

            {/* Left: Active Item */}
            <div className="font-semibold text-gray-300 dark:text-gray-200">
                {activeItem}
            </div>

            {/* Center: Search Bar */}


            {/* Right: Notifications + User Info + Logout */}
            <div className="flex items-center gap-4">
               <span className="h-16 flex items-center cursor-pointer">
  <button onClick={()=>{ window.location.href = "https://github.com/sushrut-bhokre/Edge-Computing/"}}><img
    src={gitlogo}
    alt="GitHub"
    className="h-8 rounded-full w-auto object-contain"
  /></button>
</span>

                <span className="text-gray-100 dark:text-gray-300  text-xl">
                    {username}
                </span>
                <button
                    onClick={handleLogout}
                    className="text-xl text-red-600 hover:text-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
