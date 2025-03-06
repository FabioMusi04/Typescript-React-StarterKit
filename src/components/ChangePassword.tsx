import { useState } from "react";

export interface IChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => void;
}

const ChangePasswordModal: React.FC<IChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password.currentPassword, password.newPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 fade-in">
      <div className="bg-white p-4 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium text-secondary">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full p-2 border border-third rounded-md"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-secondary">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full p-2 border border-third rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-md"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
