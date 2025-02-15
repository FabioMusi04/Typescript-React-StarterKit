import React, { useState, useRef, useEffect } from 'react';
import Drawer from '../components/Drawer';
import Navbar from '../components/Navbar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Days, Months, INotification } from '../../ts/types';

const Notification: React.FC = () => {
  const pageName = "Notification";
  const [openMenuIndex, setOpenMenuIndex] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const notificationMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleNotificationMenu = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === String(index) ? null : String(index)));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (notificationMenuRefs.current.every((ref) => ref && !ref.contains(event.target as Node))) {
      console.log('clicked outside');
      setOpenMenuIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(openMenuIndex);
  }, [openMenuIndex]);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <>
      <div className="flex h-screen">
        <Drawer />

        <div className="flex-grow bg-primary dark:bg-gray-900 p-6">
          <Navbar pageName={pageName} />

          <div className="w-full bg-secondary dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center rounded mt-5">
            <p className="text-xl font-semibold text-secondary dark:text-gray-200">Notifications: ({notifications?.filter(
              (notification) => !notification.isRead
            ).length}) unread</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">Mark all as read</button>
          </div>

          <div className="w-full bg-secondary dark:bg-gray-800 shadow-md px-6 py-4 justify-between items-center rounded mt-5">
            {(() => {
              const groupedNotifications = notifications.reduce((acc, notification) => {
                const now = new Date();
                const sentDate = new Date(notification.sentDate);
                const diffInDays = Math.floor((now.getTime() - sentDate.getTime()) / (1000 * 60 * 60 * 24));

                let group = '';
                if (diffInDays === 0) {
                  group = "Today";
                } else {
                  group = `${yesterday.getDay()} ${Days[yesterday.getDay()]}  ${Months[yesterday.getMonth()]}, ${yesterday.getFullYear()}`;
                }

                if (!acc[group]) {
                  acc[group] = [];
                }
                acc[group].push(notification);
                return acc;
              }, {} as Record<string, typeof notifications>);

              return Object.entries(groupedNotifications).map(([group, notifications]) => (
                <div key={group}>
                  <div className="flex justify-between items-center mt-4">
                    <h2 className="text-lg font-semibold text-secondary dark:text-gray-200">{group}</h2>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="h-4 w-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500" />
                      <p className="text-secondary dark:text-gray-200">Select all</p>
                    </div>
                  </div>

                  {notifications.map((notification) => (
                    <div key={notification.id} className={`flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700 rounded px-5 ${!notification.isRead ? 'bg-blue-950' : ''}`}>
                      <div className="flex-grow">
                        <p className="text-secondary dark:text-gray-200">{notification.title}</p>
                        <p className="text-secondary dark:text-gray-400">
                          {(() => {
                            const now = new Date().getTime();
                            const sentTime = notification.sentDate.getTime();
                            const diffInMinutes = Math.floor((now - sentTime) / (1000 * 60));
                            if (diffInMinutes < 60) {
                              return `${diffInMinutes} minutes ago`;
                            } else if (diffInMinutes < 1440) {
                              const diffInHours = Math.floor(diffInMinutes / 60);
                              return `${diffInHours} hours ago`;
                            } else {
                              const diffInDays = Math.floor(diffInMinutes / 1440);
                              return `${diffInDays} days ago`;
                            }
                          })()}
                        </p>
                      </div>
                      {!notification.isRead && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                      <BsThreeDotsVertical className="h-6 w-6 text-gray-700 dark:text-gray-200 cursor-pointer" onClick={() => toggleNotificationMenu(notification.id)} />
                      <div className="relative" ref={(ref) => {
                        notificationMenuRefs.current.push(ref);
                      }}>
                        {openMenuIndex === notification.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-secondary dark:bg-gray-700 rounded-md shadow-lg z-10">
                            <ul className="py-1">
                              <li className="px-4 py-2 text-secondary dark:text-gray-200 hover:bg-primary dark:hover:bg-gray-600 cursor-pointer">Mark as read</li>
                              <li className="px-4 py-2 text-secondary dark:text-gray-200 hover:bg-primary dark:hover:bg-gray-600 cursor-pointer">Delete</li>
                              <li className="px-4 py-2 text-secondary dark:text-gray-200 hover:bg-primary dark:hover:bg-gray-600 cursor-pointer">Select</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
