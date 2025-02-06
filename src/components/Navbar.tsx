import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import profilePic from '../assets/react.svg';
interface NavbarProps {
    pageName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
    const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);
    const [showNotificationMenu, setShowNotificationMenu] = useState<boolean>(false);

    const settingsMenuRef = useRef<HTMLDivElement>(null);
    const notificationMenuRef = useRef<HTMLDivElement>(null);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB');

    const username = "John Doe";
    const role = "Administrator";

    const [notifications, setNotifications] = useState([]);

    const toggleSettingsMenu = () => {
        setShowSettingsMenu(!showSettingsMenu);
        setShowNotificationMenu(false); // Close notifications if settings menu is opened
    };

    const toggleNotificationMenu = () => {
        setShowNotificationMenu(!showNotificationMenu);
        setShowSettingsMenu(false); // Close settings if notification menu is opened
    };

    const handleClickOutside = (event: MouseEvent) => {
        // Close the menus if clicked outside
        if (
            settingsMenuRef.current &&
            !settingsMenuRef.current.contains(event.target as Node) &&
            notificationMenuRef.current &&
            !notificationMenuRef.current.contains(event.target as Node)
        ) {
            setShowSettingsMenu(false);
            setShowNotificationMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="w-full bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col items-start space-y-1">
                {!pageName && (
                    <>
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Welcome, {username}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Today is {formattedDate}.
                        </p>
                    </>
                )}
                {pageName === "Notification" && (
                    <>
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                            <FaBell /> <span>{pageName}</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Read and delete notifications here.
                        </p>
                    </>
                )}
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative" ref={notificationMenuRef}>
                    <FaBell
                        className="h-6 w-6 text-gray-700 dark:text-gray-200 cursor-pointer"
                        onClick={toggleNotificationMenu}
                    />

                    {showNotificationMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2">
                            <p className="block px-4 py-2 text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="mr-2 text-red-500 font-bold">{notifications.length}</span>
                                notifications
                            </p>
                            <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
                                View all notifications
                            </a>
                        </div>
                    )}
                </div>

                <div className="relative" ref={settingsMenuRef}>
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleSettingsMenu}>
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <div className="flex flex-col text-sm text-gray-700 dark:text-gray-200">
                            <span>{username}</span>
                            <span className="text-gray-500 dark:text-gray-400">{role}</span>
                        </div>

                        <FaChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-200" />
                    </div>

                    {showSettingsMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2">
                            <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
