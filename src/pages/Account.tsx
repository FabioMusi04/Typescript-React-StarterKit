import { useEffect, useState } from "react";
import { IAlertProps, AlertTypeEnum } from "../../ts/types";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";
import axiosInstance from "../../ts/axiosInstance";
import ChangePasswordModal, {
  IChangePasswordModalProps,
} from "../components/ChangePassword";

const Account = () => {
  const [alert, setAlert] = useState<IAlertProps>({
    message: "",
    type: AlertTypeEnum.SUCCESS,
    onClose: () => {},
  });

  const [changePasswordModal, setChangePasswordModal] =
    useState<IChangePasswordModalProps>({
      isOpen: false,
      onClose: () => {},
      onSubmit: () => {},
    });

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    profilePicture: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get("/users/me");
      console.log(data);
      setUserInfo({
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        profilePicture: data.profilePicture,
      });
    };

    fetchData();
  }, []);

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit user info changes to API
  };

  const handlePasswordSubmit = (
    currentPassword: string,
    newPassword: string
  ) => {
    if (currentPassword === "" || newPassword === "") {
      setAlert({
        message: "Please fill in all fields",
        type: AlertTypeEnum.ERROR,
        onClose: () =>
          setAlert({
            ...alert,
            message: "",
          }),
      });
      return;
    }
    if (currentPassword === newPassword) {
      setAlert({
        message: "New password must be different from current password",
        type: AlertTypeEnum.ERROR,
        onClose: () =>
          setAlert({
            ...alert,
            message: "",
          }),
      });
      return;
    }

    axiosInstance
      .put("/users/me/password", {
        currentPassword,
        newPassword,
      })
      .then(() => {
        setAlert({
          message: "Password changed successfully",
          type: AlertTypeEnum.SUCCESS,
          onClose: () =>
            setAlert({
              ...alert,
              message: "",
            }),
        });
      })
      .catch((err) => {
        setAlert({
          message: err.response.data.message,
          type: AlertTypeEnum.ERROR,
          onClose: () =>
            setAlert({
              ...alert,
              message: "",
            }),
        });
      });

    setChangePasswordModal({
      ...changePasswordModal,
      isOpen: false,
    });
  };

  return (
    <div className="w-full min-h-screen bg-primary">
      <Navbar />
      <Alert {...alert} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-secondary">
          Account Settings
        </h1>
        <div className="flex flex-col items-center mb-4">
          <img
            src={userInfo.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full mb-4"
          />
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="px-4 py-2 bg-secondary text-white rounded-md mb-4"
          >
            {isEditMode ? "Cancel" : "Edit"}
          </button>
        </div>
        <form
          onSubmit={handleUserInfoSubmit}
          className="grid grid-cols-2 gap-4"
        >
          <div className="mb-2">
            <label className="block text-sm font-medium text-secondary">
              Username
            </label>
            {isEditMode ? (
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleUserInfoChange}
                className="mt-1 block w-full p-2  rounded-md"
              />
            ) : (
              <p className="mt-1 block w-full p-2  rounded-md">
                {userInfo.username}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-secondary">
              Email
            </label>
            {isEditMode ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleUserInfoChange}
                className="mt-1 block w-full p-2  rounded-md"
              />
            ) : (
              <p className="mt-1 block w-full p-2  rounded-md">
                {userInfo.email}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-secondary">
              First Name
            </label>
            {isEditMode ? (
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleUserInfoChange}
                className="mt-1 block w-full p-2  rounded-md"
              />
            ) : (
              <p className="mt-1 block w-full p-2  rounded-md">
                {userInfo.firstName}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-secondary">
              Last Name
            </label>
            {isEditMode ? (
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleUserInfoChange}
                className="mt-1 block w-full p-2  rounded-md"
              />
            ) : (
              <p className="mt-1 block w-full p-2  rounded-md">
                {userInfo.lastName}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-secondary">
              Role
            </label>
            <p className="mt-1 block w-full p-2  rounded-md">{userInfo.role}</p>
          </div>
          {isEditMode && (
            <button
              type="submit"
              className="col-span-2 px-4 py-2 bg-secondary text-white rounded-md"
            >
              Save Changes
            </button>
          )}
        </form>
        <button
          onClick={() =>
            setChangePasswordModal({
              isOpen: true,
              onClose: () =>
                setChangePasswordModal({
                  ...changePasswordModal,
                  isOpen: false,
                }),
              onSubmit: (currentPassword: string, newPassword: string) =>
                handlePasswordSubmit(currentPassword, newPassword),
            })
          }
          className="px-4 py-2 bg-secondary text-white rounded-md mt-4"
        >
          Change Password
        </button>
        <ChangePasswordModal {...changePasswordModal} />
      </div>
      <Footer />
    </div>
  );
};

export default Account;
