import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Dropdown from '../components/dropdown'

const Monitor = () => {

  const navigate = useNavigate()
  const user = localStorage.getItem("user")

  const [iframeSrc, setIframeSrc] = useState("http://10.51.241.195:5511")

  useEffect(() => {
    const token = localStorage.getItem("userdbtoken")
    if (!token) navigate("/login")
  }, [navigate])

  return (
    <div className="flex h-screen bg-[#0b0f14] overflow-hidden">
      <Sidebar activeItem="Monitoring" />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar activeItem="Monitoring" user={user} />

        {/* Dropdown Bar */}
        <div className="p-3 bg-[#0b0f14] border-b border-gray-700">
          <Dropdown onNodeSelect={setIframeSrc} />
        </div>

        {/* Iframe */}
        <iframe
          src={iframeSrc}
          className="w-full h-full border-none"
          title="Dashboard Content"
        />
      </div>
    </div>
  )
}

export default Monitor

