import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../lib/authSlice";
import useThemeToggle from "./ThemeToggle";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { setSelectedColor, setDarkTheme } = useThemeToggle();

	const checkAuthUser = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/user/profile");
			if (response) {
				dispatch(setUser(response.data));
				localStorage.setItem("userDetails", JSON.stringify(response.data));
				setSelectedColor(response.data.colorSelected);
				setDarkTheme(response.data.themeSelected === "dark");
				setIsAuthenticated(true);
				// navigate("/");
				toast.success(
					`Hey ${
						response.data.username ? response.data.username : "Friend"
					} Glad to Have You`
				);

				return true;
			}
			return false;
		} catch (error) {
			console.error("Error while fetching user: ", error);
			setIsAuthenticated(false);
			localStorage.removeItem("userDetails");
			Cookies.remove("token");
			dispatch(clearUser());
			navigate("/authenticate");
			toast.error("Authentication Required");
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const userDetails = localStorage.getItem("userDetails");
		if (!userDetails) {
			navigate("/authenticate");
		}
		checkAuthUser();
	}, []);

	const value = {
		isLoading,
		isAuthenticated,
		setIsAuthenticated,
		setIsLoading,
		checkAuthUser,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
	return useContext(AuthContext);
}
