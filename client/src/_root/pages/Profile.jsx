import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../lib/authSlice";
import { Cursor, Typewriter } from "react-simple-typewriter";
import moment from "moment/moment";
import Search from "../../components/shared/Search";
import ThemeEditor from "../../components/shared/ThemeEditor";
import GetRandomImage from "../../utils/GetRandomImage";
const Profile = () => {
	const user = useSelector(getUser);
	// List of image filenames
	let imageList = ["1.png", "2.png", "3.png", "4.png", "5.png"];

	const randomImage = GetRandomImage(imageList);
	return (
		<div className="flex flex-col items-center justify-center gap-7 py-2 px-4 lg:w-4/5 min-h-[100%]">
			<h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold w-full text-center">
				<Typewriter
					words={[
						`Hi, There ${user?.username}`,
						"Guy-Who-Love-Coffee.tsx",
						"< ButLovesToCodeMore />",
						"WE ARE GLAD TO HAVE YOU",
					]}
					loop={true}
					cursor
					cursorStyle="_"
					typeSpeed={70}
					deleteSpeed={50}
					delaySpeed={2000}
				/>
				<Cursor cursorColor="#F7AB0A" />
			</h1>
			<div className="grid grid-cols-1 gap-4 items-center justify-center w-full">
				<div className="flex items-center justify-center gap-4 w-full">
					<img
						src={`/users/${user ? user?.profilePicture : randomImage}`}
						alt={user?.fullname}
						className={`h-24 w-24 rounded-full object-cover`}
					/>
					<div className="flex flex-col items-start justify-center">
						<span className="text-2xl font-medium ">
							Hello {user?.fullname.split(" ")[0]}
						</span>
						<span className="text-base text-primary w-full ">
							@{user?.username}
						</span>

						{/* createdAT */}
						<span className="text-xs">
							User Registered {moment(user?.createdAt).fromNow(true)}{" "}
							{moment(user?.createdAt).fromNow() < 0 ? "from now" : "ago"}
						</span>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center gap-7 w-full">
					<div className="flex gap-4 items-center justify-center w-full pt-4">
						<ThemeEditor />
					</div>

					{/* search */}

					<Search />
				</div>
			</div>
		</div>
	);
};

export default Profile;
