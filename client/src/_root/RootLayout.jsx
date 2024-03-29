import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const RootLayout = () => {
	return (
		<div className="w-full flex flex-col gap-8 items-center">
			<Navbar />
			<section className="flex flex-1 w-full justify-center items-center h-full ">
				<Outlet />
			</section>
		</div>
	);
};

export default RootLayout;
