import React from "react";
import Loader from "./Loader";

const Register = ({
	errors,
	handleStateChange,
	handleChange,
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
				{/* Switch Button */}
				<div className="flex flex-col py-6 items-center justify-center bg-gradient-to-r from-blue-600 to-[#03a9f4f0] text-white sm:rounded-lg">
					<span className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
						Welcome Back
					</span>
					<span className="text-lg md:text-xl mb-4 text-center w-3/4">
						To Keep you connected with us please Register using your personal
						info
					</span>
					<p className="text-center text-base md:text-lg  font-normal my-4">
						Already have an account ?{" "}
					</p>
					<button
						className="authButton bg-gradient-to-r from-[#03a9f4f0] to-blue-600"
						onClick={handleStateChange}
					>
						Authenticate
					</button>
				</div>
				{/* Authentication Form */}
				<div className="flex flex-col items-center justify-center px-8 py-8">
					<span className="text-3xl sm:text-5xl font-extrabold mb-4 text-center">
						Register
					</span>
					<form
						className="flex flex-col gap-4 justify-center items-center w-full p-4 mx-auto"
						onKeyDown={handleKeyDown}
					>
						<input
							type="text"
							placeholder="Name"
							name="fullname"
							value={data.fullname}
							autoComplete="on"
							className={`input ${
								errors.fullname ? "input-error shake-animation" : ""
							}`}
							onChange={handleChange}
						/>
						{errors.fullname && (
							<p className="error-message">{errors.fullname}</p>
						)}
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
						{errors.username && (
							<p className="error-message">{errors.username}</p>
						)}

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
							<p className="error-message">{errors.password}</p>
						)}
					</form>
					<button
						className={`${
							!isFormValid
								? "hidden"
								: "authButton bg-gradient-to-r from-[#03a9f4f0] to-blue-600 text-white"
						} `}
						onClick={handleSubmit}
					>
						{loading ? <Loader /> : "Register"}
					</button>
				</div>
			</div>
		</>
	);
};

export default Register;
