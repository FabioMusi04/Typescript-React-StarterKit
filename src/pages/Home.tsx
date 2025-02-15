import { useEffect, useState } from "react";
import { IAlertProps, AlertTypeEnum } from "../../ts/types";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const [alert, setAlert] = useState<IAlertProps>({
    message: "",
    type: AlertTypeEnum.SUCCESS,
    onClose: () => {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  return (
    <div className="w-full min-h-screen bg-primary">
      <Navbar />
      <Alert {...alert} />
      <Footer />
    </div>
  );
};

export default LandingPage;
