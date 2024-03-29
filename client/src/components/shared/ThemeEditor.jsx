import React, { useState } from "react";
import useThemeToggle from "../../context/ThemeToggle";
import { SketchPicker, SwatchesPicker } from "react-color";

const ThemeEditor = () => {
	const { theme, toggleTheme, selectedColor, setSelectedColor } =
		useThemeToggle();
	// Handler for color change
	const handleColorChange = (color) => {
		setSelectedColor(color.hex);
	};
	const [toggleColorSelector, setToggleColorSelector] = useState(false);

	return (
		<>
			{/* theme toggle button */}
			<div
				className={`themeEditorButtons group ${
					theme === "light"
						? "border-gray-300"
						: "border-[var(--selected-color)]"
				} `}
				onClick={toggleTheme}
				title="Switch Theme"
			>
				{theme === "light" ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 group-hover:stroke-white"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5 sm:w-6 sm:h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
						/>
					</svg>
				)}
				<span className="hidden sm:block md:hidden 1xl:block">
					Toggle Background
				</span>
			</div>

			{/* Color Picker */}
			<div
				className={`relative themeEditorButtons group ${
					theme === "light"
						? "border-gray-300"
						: "border-[var(--selected-color)]"
				}  `}
				title="Text Theme Picker"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 group-hover:stroke-white"
					onClick={() => setToggleColorSelector((prev) => !prev)}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
					/>
				</svg>
				{toggleColorSelector && (
					<div
						className="absolute top-12 -left-28 md:left-2 flex flex-col md:flex-row items-center justify-center gap-4"
						onMouseLeave={() => setToggleColorSelector(false)}
					>
						<SketchPicker color={selectedColor} onChange={handleColorChange} />
						<SwatchesPicker
							color={selectedColor}
							onChange={handleColorChange}
							width={274}
						/>
					</div>
				)}
				<span
					onClick={() => setToggleColorSelector((prev) => !prev)}
					className="hidden sm:block md:hidden 1xl:block"
				>
					Toggle Text
				</span>
			</div>

			{selectedColor?.length > 0 && (
				<button
					onClick={() => setSelectedColor("")}
					className={`themeEditorButtons ${
						theme === "light"
							? "border-gray-300"
							: "border-[var(--selected-color)]"
					} `}
					title="Clear Text Theme"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5 sm:w-6 sm:h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
						/>
					</svg>
				</button>
			)}
		</>
	);
};

export default ThemeEditor;
