import React from 'react'
import { Navigate } from 'react-router-dom'

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
}

const ProtectedRoute = ({ children }) => {

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;