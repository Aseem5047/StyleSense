import React from "react";
import useAuth from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
	const { isAuthenticated } = useAuth();

	return <>{isAuthenticated ? <Navigate to="/" /> : <Outlet />}</>;
};

export default AuthLayout;
