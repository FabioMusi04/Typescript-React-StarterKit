import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import { useAuth } from './AuthProvider';
import { INotification } from '../../ts/types';

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

    const { user, logout } = useAuth();

    const [notifications, /* setNotifications */] = useState<INotification[]>([]);

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
        <nav className="w-full bg-secondary shadow-md px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col items-start space-y-1">
                {!pageName && (
                    <>
                        <h1 className="text-xl font-semibold text-third">
                            Welcome, {user?.username || 'User'}
                        </h1>
                        <p className="text-third">
                            Today is {formattedDate}.
                        </p>
                    </>
                )}
                {pageName === "Notification" && (
                    <>
                        <h1 className="text-xl font-semibold text-third flex items-center space-x-2">
                            <FaBell /> <span>{pageName}</span>
                        </h1>
                        <p className="text-third">
                            Read and delete notifications here.
                        </p>
                    </>
                )}
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative" ref={notificationMenuRef}>
                    <FaBell
                        className="h-6 w-6 text-primary cursor-pointer"
                        onClick={toggleNotificationMenu}
                    />

                    {showNotificationMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg py-2">
                            <p className="px-4 py-2 text-third flex items-center">
                                <span className="mr-2 text-primary font-bold">{notifications.length}</span>
                                notifications
                            </p>
                            <a href="#" className="px-4 py-2 text-third hover:text-primary flex items-center">
                                View all notifications
                            </a>
                        </div>
                    )}
                </div>

                <div className="relative" ref={settingsMenuRef}>
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleSettingsMenu}>
                        <img
                            src={user?.profilePicture || 'https://ui-avatars.com/api/?name=John+Doe'}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <div className="flex flex-col text-sm text-third">
                            <span>{user?.email}</span>
                            <span className="text-primary">{user?.role}</span>
                        </div>

                        <FaChevronDown className="h-4 w-4 text-primary" />
                    </div>

                    {showSettingsMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg py-2">
                            <a href="/account/me" className="block px-4 py-2 text-third hover:text-primary">Profile</a>
                            <a href="#" className="block px-4 py-2 text-third hover:text-primary">Settings</a>
                            <a className="block px-4 py-2 text-third hover:text-primary" onClick={logout}>Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
