import React, { useState } from 'react';
import logo from '../assets/react.svg';
import sideImage from '../assets/login.svg';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center grow bg-gray-100 dark:bg-gray-900 h-screen">
      <div className="flex flex-col md:flex-row w-full h-full bg-white dark:bg-gray-800 shadow-md">
        <div className="w-full md:w-1/2 p-10 space-y-8 flex flex-col justify-center items-center">
          <div className="w-full max-w-xl">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-12" />
                <span className="text-xl font-bold text-gray-700 dark:text-gray-200">Sinergia Manager</span>
              </div>
              <button className="bg-transparent hover:bg-blue-500 text-blue-500 dark:text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded" onClick={() => navigate("/register")}>
                Sign Up
              </button>
            </div>

            <div className="space-y-2 mb-10">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Welcome Back</h2>
              <p className="text-gray-600 dark:text-gray-400">Please sign in</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="●●●●●●●"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 focus:outline-none"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-blue-500 dark:text-blue-400 hover:underline">
                  I forgot my password
                </a>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-400 to-blue-700 dark:from-blue-600 dark:to-blue-900 rounded hover:from-blue-700 hover:to-blue-900"
                onClick={() => navigate("/dashboard")}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:block w-1/2">
          <img src={sideImage} alt="Side" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
