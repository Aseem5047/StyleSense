import React from "react";
import useThemeToggle from "../../context/ThemeToggle";
import { Link } from "react-router-dom";

const Search = () => {
	const { theme } = useThemeToggle();
	return (
		<div
			className={`hidden md:flex gap-4 items-center border-2 ${
				theme === "light" ? "border-gray-300" : "border-[var(--selected-color)]"
			} py-2 px-4 rounded-full`}
		>
			<Link to="/" className="navLink">
				Trending
			</Link>
			<span>|</span>
			<Link to="/laptops" className="navLink">
				Laptops
			</Link>
			<span>|</span>
			<Link to="/mobiles" className="navLink">
				Mobile
			</Link>
			<span>|</span>
			<div className="bg-[var(--default-color)] p-2 rounded-full transition-all duration-500 hover:scale-110 cursor-pointer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="white"
					className="w-4 h-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
					/>
				</svg>
			</div>
		</div>
	);
};

export default Search;
