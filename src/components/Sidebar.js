// components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
const ip = `${window.location.hostname}`;
const Sidebar = ({ activeItem, setActiveItem }) => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', link: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Clusters', link: `/pcs/`, icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { name: 'Nodes', link: '/nodes', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' },
        { name: 'Monitoring', link: '/monitor', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { name: 'VMs', link: '/vm_page', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    const handleNavigation = (item) => {
        setActiveItem && setActiveItem(item.name);

        if (item.link.startsWith('/')) {
            navigate(item.link);
        } else {
            window.location.href = item.link;
        }
    };

    return (
        /* Added 'flex flex-col' to the container */
        <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 z-50 flex flex-col">

            {/* Logo */}
            <div
                className="p-4 text-3xl font-bold cursor-pointer text-center border-b border-gray-700"
                onClick={() => navigate('/')}
            >
                ZEUS
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => handleNavigation(item)}
                                className={`w-full flex items-center px-4 py-3 transition-colors ${activeItem === item.name
                                    ? 'bg-gray-800 text-white border-l-4 border-blue-500'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <svg
                                    className="w-6 h-6 mx-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={item.icon}
                                    />
                                </svg>
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Zeus Doc - Pushed to bottom using mt-auto */}
            <div className="mt-auto border-t border-gray-700">
                <a 
                    href="http://10.51.241.195:3002" 
                    className="flex items-center justify-center p-6 text-blue-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                    <h5 className="font-semibold ">Documenation ↗</h5>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
