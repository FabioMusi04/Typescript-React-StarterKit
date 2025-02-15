import React, { useState } from 'react';
import icon from '../assets/icon.png';
import { MdDashboard } from 'react-icons/md';
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BackOfficeSections, IBackOfficeSection } from '../../ts/types';

const Drawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    const onMenuItemClick = (route: string) => {
        console.log(`Navigating to ${route}`);
        navigate('/dashboard?tab=' + route);
    };

    return (
        <div className="bg-secondary">
            <button
                className="fixed bottom-4 left-4 z-50 bg-secondary p-4 rounded-md shadow-md md:hidden cursor-pointer"
                onClick={toggleDrawer}
            >
                <FaBars className="h-6 w-6 text-third" />
            </button>
            {isOpen && <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={closeDrawer}></div>}
            <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 w-64 h-screen bg-secondary text-third shadow-lg`}>
                <div className="text-center p-4 space-y-5 flex flex-col items-center">
                    <img src={icon} alt="React Logo" className="h-8 w-8" />
                    <p className="text-xl font-bold">{import.meta.env.VITE_APP_NAME}</p>
                    <p className="text-xs ml-2">{import.meta.env.VITE_APP_DESCRIPTION}</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-md px-4">Main Menu</h2>
                    <ul className="mt-3 space-y-5">
                        <li onClick={() => onMenuItemClick('dashboard')} className="flex items-center px-4 py-2 hover:text-primary cursor-pointer">
                            <MdDashboard size={24} className="mr-2 text-green-400" />
                            <span className="font-semibold">Dashboard</span>
                        </li>
                        {
                            Object.values(BackOfficeSections).map((section: IBackOfficeSection, index: number) => (
                                <li key={index} onClick={() => onMenuItemClick(section.name)} className="flex items-center px-4 py-2 hover:text-primary cursor-pointer">
                                    <section.icon size={24} className="mr-2 text-green-400" />
                                    <span className="font-semibold">{section.name}</span>
                                </li>
                            ))
                        }
                        <li onClick={() => navigate('/')} className="flex items-center px-4 py-2 hover:text-primary cursor-pointer"> 
                            <FaBars size={24} className="mr-2 text-green-400" />
                            <span className="font-semibold">Go Back</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Drawer;
