import logo from "../assets/icon.png";
import Alert from "./Alert";
import axiosInstance from "../../ts/axiosInstance";

import { FaEyeSlash, FaEye, FaUser, FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { AlertTypeEnum } from "../../ts/types";
import { AxiosError } from "axios";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [firstName, setFirstName] = useState("Fabio");
    const [lastName, setLastName] = useState("Musitelli");
    const [username, setUsername] = useState("Musi");
    const [email, setEmail] = useState("musi@musi.com");
    const [password, setPassword] = useState("MusiMusi");
    const [confirmPassword, setConfirmPassword] = useState("MusiMusi");
    const [alert, setAlert] = useState<{
        message: string;
        type: "success" | "error" | "warning";
        onClose: () => void;
    }>({ message: "", type: "success", onClose: () => {} });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({
                message: "Passwords do not match",
                type: AlertTypeEnum.ERROR,
                onClose: () =>
                    setAlert({ message: "", type: "success", onClose: () => {} }),
            });
            return;
        }
        try {
            const result = await axiosInstance.post("/auth/register", {
                firstName,
                lastName,
                username,
                email,
                password,
            });
            if (result.status >= 200 && result.status < 300) {
                setAlert({
                    message: "Registered successfully",
                    type: AlertTypeEnum.SUCCESS,
                    onClose: () =>
                        setAlert({ message: "", type: "success", onClose: () => {} }),
                });
                navigate("/login");
            } else {
                console.log(result)
                setAlert({
                    message: result.data.details[0].message,
                    type: AlertTypeEnum.ERROR,
                    onClose: () =>
                        setAlert({ message: "", type: "success", onClose: () => {} }),
                });
            }
        } catch (error) {
            setAlert({
                message: (error as AxiosError)?.response?.data?.details?.[0]?.message || "An error occurred",
                type: AlertTypeEnum.ERROR,
                onClose: () =>
                    setAlert({ message: "", type: "success", onClose: () => {} }),
            });
        }
    };

    return (
        <div className="flex items-center justify-center grow bg-primary bg-secondary h-screen">
            <Alert {...alert} />
            <div className="flex flex-col items-center justify-center p-6 w-3/4">
                <img src={logo} alt="Logo" className="w-20 mb-6" />
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Register</h2>
                <form onSubmit={handleRegister} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Lastname"
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full p-2 text-secondary bg-primary rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-4 flex flex-col items-center space-y-2 text-sm">
                    <Link
                        to="/login"
                        className="text-primary hover:underline dark:text-blue-400"
                    >
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
