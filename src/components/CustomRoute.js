import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {isAuthenticated} from "../services/AuthService";

export const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet/> : <Navigate to="/auth"/>;
};

export const PublicRoute = () => {
    return !isAuthenticated() ? <Outlet/> : <Navigate to="/home/files"/>;
};