import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBasketItems } from "../../lib/basketSlice";
import { Link, useNavigate } from "react-router-dom";
import useThemeToggle from "../../context/ThemeToggle";
import GetRandomImage from "../../utils/GetRandomImage";
import { clearUser } from "../../lib/authSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import useAuth from "../../context/AuthContext";
import Search from "./Search";
import ThemeEditor from "./ThemeEditor";

const Navbar = () => {
	const [toggleSignOutMenu, setToggleSignOutMenu] = useState(false);
	const totalCartItems = useSelector(getBasketItems);
	const user = useSelector((state) => state.auth.user);
	const { checkAuthUser, setIsAuthenticated } = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { theme } = useThemeToggle();

	// List of image filenames
	let imageList = ["1.png", "2.png", "3.png", "4.png", "5.png"];

	const randomImage = GetRandomImage(imageList);

	const handleLogout = async (event) => {
		try {
			setToggleSignOutMenu(false);
			// Remove token from localStorage and cookies
			Cookies.remove("token");
			localStorage.clear();
			// Dispatch action to clear user
			dispatch(clearUser());
			toast.success("User Logged Out");
			setIsAuthenticated(false);
			navigate("/authenticate");
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Something Went Wrong");
			// Handle error appropriately, e.g., show an error toast
		}
	};

	return (
		<div className="sticky top-0 z-50 bg-[var(--bg-color)] flex items-center justify-between w-full px-4 md:px-10 3xl:px-20 shadow-md py-2  min-h-20 max-h-20">
			{/* logo */}
			<div className="flex gap-2 items-center">
				<Link to="/" className="mr-2">
					<img
						src={`${
							theme === "light" ? "/assets/logo.png" : "/assets/favicon.ico"
						} `}
						alt=""
						className={`${
							theme !== "light" ? "w-12" : "w-20 xs:w-28 lg:w-44"
						} transition-all duration-500 hover:scale-105`}
					/>
				</Link>

				{/* buttons to edit theme */}
				<ThemeEditor />
			</div>
			{/* search */}

			<Search />

			{/* Profile and menu section */}
			<div className="flex gap-4 items-center justify-center">
				<div
					className="relative flex items-center justify-center gap-2 cursor-pointer"
					onClick={() => setToggleSignOutMenu((prev) => !prev)}
				>
					<img
						src={`/users/${user ? user?.profilePicture : randomImage}`}
						alt={user?.fullname}
						className={`h-12 w-12 rounded-xl object-cover hover:scale-105`}
					/>
					<div className="hidden lg:flex flex-col items-center justify-start">
						<span className="text-base font-medium hover:scale-105 overflow-hidden whitespace-nowrap text-ellipsis max-w-24">
							Hello {user ? user?.fullname?.split(" ")[0] : "Guest"}
						</span>
						<span className="text-sm text-primary w-full hover:scale-105">
							@{user ? user?.username : "guest"}
						</span>
					</div>

					{/* SignOut Menu */}
					{toggleSignOutMenu && user && (
						<div
							className="absolute top-16 right-4 md:right-10 md:top-14 1xl:left-7 bg-[var(--bg-color)] p-4 rounded-tr-none 1xl:rounded-tl-none 1xl:rounded-tr-xl rounded-xl min-w-56 flex flex-col items-start justify-start gap-4  shadow-md border-2 border-gray-300"
							onMouseLeave={() => setToggleSignOutMenu(false)}
						>
							<div className="flex items-center justify-center gap-4 w-full">
								<img
									src={`/users/${user ? user?.profilePicture : randomImage}`}
									alt={user?.fullname}
									className={`h-12 w-12 rounded-xl object-cover`}
								/>
								<div className="flex flex-col items-start justify-center w-full">
									<span className="text-sm font-medium">
										Glad to Have You Visit Again
									</span>
									<span className="text-xs text-primary w-full">
										Need Some Rest ?
									</span>
								</div>
							</div>

							<Link
								to={`/user/profile/${user?._id}`}
								className="button gap-2 justify-center w-full text-sm"
							>
								Visit Profile
							</Link>
							{/* Log Out Button */}
							<button
								className={`flex button gap-2 justify-center w-full`}
								onClick={handleLogout}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
									/>
								</svg>

								<span className="text-sm font-medium">Log Out</span>
							</button>
						</div>
					)}
				</div>

				{/* Other Link */}
				<div className="hidden lg:flex items-center justify-center gap-3">
					<Link
						to={`/user/profile/${user?._id}`}
						className="hidden xl:flex flex-col items-center justify-start navLink group !rounded-xl"
					>
						<span className="text-base font-medium">Account</span>
						<span className="text-sm text-primary w-full transition-all duration-500 group-hover:text-white">
							& Profile
						</span>
					</Link>
					<Link
						to={"/"}
						className="hidden 2xl:flex flex-col items-center justify-start navLink group !rounded-xl"
					>
						<span className="text-base font-medium">Subscption</span>
						<span className="text-sm text-primary w-full transition-all duration-500 group-hover:text-white">
							Prime+
						</span>
					</Link>
				</div>

				{/* cartIcon */}
				<Link
					to="/checkout"
					className={`relative flex gap-1 items-center p-2 group  rounded-xl transition-all duration-500 hover:scale-110 cursor-pointer border-2 shadow-md ${
						theme === "light"
							? "border-gray-300"
							: "border-[var(--selected-color)]"
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
						/>
					</svg>
					<span className="text-sm font-medium">{totalCartItems.length}</span>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
