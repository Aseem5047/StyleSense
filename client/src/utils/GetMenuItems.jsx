export const GetMenuItems = (setToggleMenu) => {
	return [
		{
			label: "Authenticate",
			path: "/",
			clicked: () => setToggleMenu((prev) => !prev),
		},
		{
			label: "Manage",
			path: "/",
			clicked: () => setToggleMenu((prev) => !prev),
		},
		{
			label: "Help",
			path: "/",
			clicked: () => setToggleMenu((prev) => !prev),
		},
		{
			label: "Log Out",
			path: "/",
			clicked: () => setToggleMenu((prev) => !prev),
		},
	];
};
