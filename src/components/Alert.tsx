import React, { useEffect, useState } from 'react';
import { AlertProps } from '../../ts/types'; 
import alertSuccess from '../assets/alertSuccess.svg';

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (message && onClose && message !== '') {
            setVisible(true);
            setProgress(100);

            const timer = setTimeout(() => {
                setTimeout(onClose, 300);
                setVisible(false);
            }, 3000);

            const progressInterval = setInterval(() => {
                setProgress(prev => prev - 1);
            }, 30);

            return () => {
                clearTimeout(timer);
                clearInterval(progressInterval);
            };
        }
    }, [message, onClose]);

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 p-8 rounded-md shadow-md cursor-pointer transition-opacity duration-300 
            ${visible ? 'opacity-100' : 'opacity-0'} ${message ? 'block' : 'hidden'}`}
        >
            <div className="flex flex-col items-center justify-center">
                {type === 'success' && (
                    <img
                        src={alertSuccess}
                        alt="Success Icon"
                        className="w-24 h-24 mb-6"
                    />
                )}
                <p
                    className={`text-2xl font-semibold mb-4 ${
                        type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'
                    }`}
                >
                    {type === 'success' ? 'Congratulations!' : 'Alert'}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 text-center">{message}</p>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 mt-4">
                    <div
                        className="h-full bg-green-600 dark:bg-green-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
