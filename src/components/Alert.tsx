import React, { useEffect, useState } from "react";
import { IAlertProps } from "../../ts/types";
import { AlertTypeEnum } from "../../ts/types";

const Alert: React.FC<IAlertProps> = ({
  hasConfirm = false,
  message,
  type,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message && message !== "" && hasConfirm === false) {
      setVisible(true);
      setProgress(100);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      const progressInterval = setInterval(() => {
        setProgress((prev) => prev - 1);
      }, 30);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else if (message && message !== "" && hasConfirm === true) {
      setVisible(true);
    }
  }, [message, onClose, hasConfirm]);

  const getBarColor = () => {
    switch (type) {
      case AlertTypeEnum.SUCCESS:
        return "bg-green-600 dark:bg-secondary";
      case AlertTypeEnum.ERROR:
        return "bg-red-600 dark:bg-red-400";
      case AlertTypeEnum.WARNING:
        return "bg-yellow-600 dark:bg-yellow-400";
      default:
        return "bg-gray-600 dark:bg-gray-400";
    }
  };

  const handleConfirm = () => {
    if (onClose) onClose();
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-secondary dark:bg-secondary p-4 rounded-md shadow-md cursor-pointer transition-opacity duration-300 
            ${visible ? "opacity-100" : "opacity-0"} ${
        message ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <p
          className={`text-xl font-semibold mb-2 ${
            type === AlertTypeEnum.SUCCESS
              ? "text-green-600 dark:text-green-400"
              : type === AlertTypeEnum.ERROR
              ? "text-red-400 dark:text-red-400"
              : type === AlertTypeEnum.WARNING
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {type === AlertTypeEnum.SUCCESS ? "Congratulations!" : "Alert"}
        </p>
        <p className="text-md text-primary dark:text-primary text-center">
          {message}
        </p>
        {hasConfirm === false && (
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 mt-2">
            <div
              className={`h-full transition-all duration-300 ${getBarColor()} bg-primary`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {hasConfirm === true && (
          <div className="flex mt-4 space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
