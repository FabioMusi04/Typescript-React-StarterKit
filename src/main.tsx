import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Login from "./components/Login";
import React, { StrictMode } from "react";
import PasswordReset from "./components/PasswordReset";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRouting";
import AuthProvider from "./components/AuthProvider";

import { store } from "../ts/redux";
import { UserRolesEnum } from "../ts/types";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";
import NotFound from "./components/404";
import Register from "./components/Register";
import Account from "./pages/Account";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <div className="flex flex-col w-full min-h-screen">
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/vouchers/:id"
                  element={
                    <PrivateRoute>
                      <DetailsPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<PasswordReset />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/account"
                  element={
                    <PrivateRoute>
                      <Account />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute roles={[UserRolesEnum.ADMIN]}>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <NotFound />
                  }
                />
              </Routes>
            </Router>
          </div>
        </AuthProvider>
      </Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
