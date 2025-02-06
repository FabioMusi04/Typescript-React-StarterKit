import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import Login from './components/Login';
import React, { StrictMode } from 'react';
import ForgotPassword from './components/ForgotPassword';
import ConfigurationWizard from './pages/ConfigurationWizard';
import PasswordReset from './components/PasswordReset';
import Dashboard from './pages/Dashboard';
import Notification from './pages/Notification';

const App: React.FC = () => {
  return (
    <StrictMode>
      <div className="flex flex-col w-full min-h-screen">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/configuration" element={<ConfigurationWizard />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard/>
              }
            />
            <Route path="/notifications" element={<Notification />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
