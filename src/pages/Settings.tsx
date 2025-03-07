import { useEffect, useState } from "react";
import { IAlertProps, AlertTypeEnum } from "../../ts/types";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";

const Settings = () => {
    const [alert, setAlert] = useState<IAlertProps>({
        message: "",
        type: AlertTypeEnum.SUCCESS,
        onClose: () => {},
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Add any settings-specific logic here
    }, []);

    return (
        <div className="w-full min-h-screen bg-primary">
            <Navbar />
            <Alert {...alert} />
            <div className="settings-content">
                {/* Add settings page content here */}
                <h1>Settings</h1>
            </div>
            <Footer />
        </div>
    );
};

export default Settings;