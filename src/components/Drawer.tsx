import React, { useState } from 'react';
import icon from '../assets/react.svg';
import { MdOutlineSpaceDashboard, MdOutlineInventory } from "react-icons/md";
import { IoCalculatorOutline, IoPeopleCircleOutline } from "react-icons/io5";
import { RiShoppingCart2Line } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { FaBars } from "react-icons/fa";

const Drawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <button
                className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md md:hidden cursor-pointer"
                onClick={toggleDrawer}
            >
                <FaBars className="h-6 w-6 text-black dark:text-white" />
            </button>
            {isOpen && <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={closeDrawer}></div>}
            <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 w-64 h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}>
                <div className="text-center p-4 space-y-5 flex flex-col items-center">
                    <img src={icon} alt="React Logo" className="h-8 w-8" />
                    <p className="text-xl font-bold">Singergia Manager</p>
                    <p className="text-xs ml-2">ERP System</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-md px-4">Main Menu</h2>
                    <ul className="mt-3 space-y-5">
                        <li className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                            <MdOutlineSpaceDashboard className="h-6 w-6 mr-2" />
                            <span className="font-semibold">Dashboard</span>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                            <RiShoppingCart2Line className="h-6 w-6 mr-2" />
                            <span className="font-semibold">Orders</span>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                            <IoCalculatorOutline className="h-6 w-6 mr-2" />
                            <span className="font-semibold">Financial Management</span>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                            <MdOutlineInventory className="h-6 w-6 mr-2" />
                            <span className="font-semibold">Inventory</span>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                            <IoPeopleCircleOutline className="h-6 w-6 mr-2" />
                            <span className="font-semibold">Human Resources Management</span>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                            <GoGraph className="h-6 w-6 mr-2" />
                            <span className="font-semibold">Forecast</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Drawer;
