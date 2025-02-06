import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';

import { User } from '../../ts/types.ts';

interface PrivateRouteProps {
    user: User | null;
    roles?: string[];
    children: ReactNode;
}

const isAuthenticated = (user: User | null, roles?: string[]): boolean => {
    const token: string | null = JSON.parse(localStorage.getItem('token') || 'null');
    const tokenExists: boolean = token !== null;
    const userExists: boolean = user !== null;
    const roleIsValid: boolean = roles ? roles.includes(user?.role || '') : true;

    const isTokenExpired = token ? new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000) < new Date() : true;

    return tokenExists && userExists && roleIsValid && !isTokenExpired;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user, roles, children }) => {
    return isAuthenticated(user, roles) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;