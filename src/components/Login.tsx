import logo from "../assets/icon.png";
import Alert from "./Alert";
import axiosInstance from "../../ts/axiosInstance";

import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { AlertTypeEnum, UserRolesEnum } from "../../ts/types";
import { useAuth } from "./AuthProvider";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning";
    onClose: () => void;
  }>({ message: "", type: "success", onClose: () => { } });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { setUser, setToken } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      if (result.status >= 200 && result.status < 300) {
        setAlert({
          message: "Logged in successfully",
          type: AlertTypeEnum.SUCCESS,
          onClose: () =>
            setAlert({ message: "", type: "success", onClose: () => { } }),
        });
        if (result.data.user.role === UserRolesEnum.ADMIN) {
          navigate("/dashboard");
          setUser(result.data.user);
          setToken(result.data.token);
        } else {
          navigate("/");
        }
      } else {
        setAlert({
          message: result.data.message,
          type: AlertTypeEnum.ERROR,
          onClose: () =>
            setAlert({ message: "", type: "success", onClose: () => { } }),
        });
      }
    } catch (error) {
      setAlert({
        message: (error as Error).message,
        type: AlertTypeEnum.ERROR,
        onClose: () =>
          setAlert({ message: "", type: "success", onClose: () => { } }),
      });
    }
  };

  return (
    <div className="flex items-center justify-center grow bg-primary dark:bg-gray-900 h-screen">
      <Alert {...alert} />
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 w-96">
        <img src={logo} alt="Logo" className="w-20 mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Login</h2>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-secondary bg-primary rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex flex-col items-center space-y-2 text-sm">
          <Link
            to="/forgot-password"
            className="text-primary hover:underline dark:text-blue-400"
          >
            Forgot Password?
          </Link>
          <Link
            to="/register"
            className="text-primary hover:underline dark:text-blue-400"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
