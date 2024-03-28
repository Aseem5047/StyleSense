import React from "react";
import useThemeToggle from "../../context/ThemeToggle";

const NavigationButtons = ({ direction, nextItem, previousItem }) => {
	const { theme } = useThemeToggle();
	return (
		<div
			className={`absolute ${
				direction === "left" ? "left-8" : "right-8"
			} top-[40%] z-40 bg-black/75 text-white p-3 rounded-full transition-all duration-500 hover:scale-110 hover:!bg-primary cursor-pointer`}
			onClick={direction === "left" ? previousItem : nextItem}
		>
			{direction === "left" ? (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5 8.25 12l7.5-7.5"
						/>
					</svg>
				</>
			) : (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m8.25 4.5 7.5 7.5-7.5 7.5"
						/>
					</svg>
				</>
			)}
		</div>
	);
};

export default NavigationButtons;
