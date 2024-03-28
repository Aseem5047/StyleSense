import { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUserPreferences } from "../lib/authSlice";
import axios from "axios";
import toast from "react-hot-toast";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const user = useSelector(getUser);
	const dispatch = useDispatch();
	const [darkTheme, setDarkTheme] = useState(
		user ? (user.themeSelected === "dark" ? true : false) : false
	);
	const [selectedColor, setSelectedColor] = useState(
		user ? user.colorSelected : ""
	);

	const toggleTheme = () => {
		setDarkTheme(!darkTheme);
	};

	const editProfile = async () => {
		if (user) {
			try {
				await axios.put(`/user/editThemePreference`, {
					id: user._id,
					themeSelected: darkTheme ? "dark" : "light",
					colorSelected: selectedColor,
				});
				toast.success("Theme Applied");

				// Dispatch action to update user preferences in store
				dispatch(
					updateUserPreferences({
						themeSelected: darkTheme ? "dark" : "light",
						colorSelected: selectedColor,
					})
				);
			} catch (error) {
				toast.error(error.response.data);
			}
		}
	};

	const theme = darkTheme ? "dark" : "light";

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);

		document.documentElement.style.setProperty(
			"--primary-color",
			selectedColor ? selectedColor : darkTheme ? "#ffffff" : "#000000"
		);

		// Trigger profile update whenever darkTheme or selectedColor changes
		editProfile();
	}, [selectedColor, darkTheme]);

	const values = {
		darkTheme,
		setDarkTheme,
		selectedColor,
		setSelectedColor,
		toggleTheme,
		theme,
	};

	return (
		<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
	);
};

export default function useThemeToggle() {
	return useContext(ThemeContext);
}
