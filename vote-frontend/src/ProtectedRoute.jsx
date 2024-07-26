// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin, isNormalUser } from './Auth';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && (!user || user.role !== requiredRole)) {
        return <Navigate to="/user-home" />; // Redirect to a default page if unauthorized
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
