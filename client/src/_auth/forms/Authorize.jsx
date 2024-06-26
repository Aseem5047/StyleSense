import React from "react";
import Loader from "./Loader";

const Authorize = ({
	errors,
	handleStateChange,
	handleChange,
	changeField,
	choosenField,
	data,
	isFormValid,
	handleSubmit,
	loading,
}) => {
	const handleKeyDown = (e) => {
		if (e.key === ("Enter" || "13") && isFormValid) {
			handleSubmit();
		}
	};
	return (
		<>
			<div className="authenticatePages">
				{/* Authentication Form */}
				<div className="flex flex-col items-center justify-center py-6 px-2">
					<span className="text-3xl sm:text-5xl font-extrabold mb-4 text-center">
						Authenticate
					</span>
					<button
						className="authButton bg-gradient-to-r from-blue-600 to-[#03a9f4f0] text-white mb-4"
						onClick={changeField}
					>
						Login using {choosenField !== "Username" ? "Username" : "Email"}
					</button>
					<form
						className="flex flex-col gap-4 justify-center items-start w-full p-4 mx-auto"
						onKeyDown={handleKeyDown}
					>
						{choosenField === "Username" && (
							<input
								type="text"
								placeholder="Username"
								name="username"
								value={data.username}
								className={`input ${
									errors.username ? "input-error shake-animation" : ""
								}`}
								onChange={handleChange}
							/>
						)}
						{errors.username && (
							<p className="error-message">{errors.username}</p>
						)}

						{choosenField === "Email" && (
							<input
								type="email"
								placeholder="Email"
								name="email"
								value={data.email}
								className={`input ${
									errors.email ? "input-error shake-animation" : ""
								}`}
								onChange={handleChange}
							/>
						)}
						{errors.email && <p className="error-message">{errors.email}</p>}

						<input
							type="password"
							placeholder="Password"
							name="password"
							value={data.password}
							className={`input ${
								errors.password ? "input-error shake-animation" : ""
							}`}
							onChange={handleChange}
						/>

						{errors.password && (
							<span className="error-message">{errors.password}</span>
						)}
					</form>
					<button
						className={`${
							!isFormValid
								? "hidden"
								: "authButton bg-gradient-to-r from-blue-600 to-[#03a9f4f0] text-white"
						} `}
						onClick={handleSubmit}
					>
						{loading ? <Loader /> : "Authenticate"}
					</button>
				</div>
				{/* Switch Button */}
				<div className="flex flex-col py-6  items-center justify-center bg-gradient-to-r from-[#03a9f4f0] to-blue-600  text-white sm:rounded-lg">
					<span className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
						Hello Friend
					</span>
					<span className="text-base md:text-xl mb-4 text-center w-3/4">
						We are glad to have you please enter your details and start your
						journey with us
					</span>
					<p className="text-center text-base md:text-lg  font-normal my-4">
						Start by creating a new account
					</p>
					<button
						className="authButton bg-gradient-to-r from-blue-600 to-[#03a9f4f0]"
						onClick={handleStateChange}
					>
						Register
					</button>
				</div>
			</div>
		</>
	);
};

export default Authorize;
