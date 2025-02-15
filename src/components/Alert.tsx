import React, { useEffect, useState } from "react";
import { IAlertProps } from "../../ts/types";
import { AlertTypeEnum } from "../../ts/types";

const Alert: React.FC<IAlertProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message && onClose && message !== "") {
      setVisible(true);
      setProgress(100);

      const timer = setTimeout(() => {
        setTimeout(onClose, 300);
        setVisible(false);
      }, 3000);

      const progressInterval = setInterval(() => {
        setProgress((prev) => prev - 1);
      }, 30);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [message, onClose]);

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
              : "text-secondary dark:text-gray-200"
          }`}
        >
          {type === AlertTypeEnum.SUCCESS ? "Congratulations!" : "Alert"}
        </p>
        <p className="text-md text-secondary dark:text-gray-300 text-center">
          {message}
        </p>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 mt-2">
          <div
            className={`h-full transition-all duration-300 ${getBarColor()} bg-primary`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
