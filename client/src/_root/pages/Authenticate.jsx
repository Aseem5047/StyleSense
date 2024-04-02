import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import Register from "../../_auth/forms/Register";
import Authorize from "../../_auth/forms/Authorize";
import GetRandomImage from "../../utils/GetRandomImage";
import useAuth from "../../context/AuthContext";

const Authenticate = () => {
	const [register, setRegister] = useState(false);
	const initialState = {
		fullname: "",
		username: "",
		email: "",
		password: "",
	};
	const { checkAuthUser } = useAuth();
	const [loading, setLoading] = useState(false);

	// List of image filenames
	let imageList = ["1.png", "2.png", "3.png", "4.png", "5.png"];

	const randomImage = GetRandomImage(imageList);

	const navigate = useNavigate();
	const [data, setData] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [choosenField, setChoosenField] = useState("Username");

	const changeField = (e) => {
		e.preventDefault();
		if (choosenField === "Username") {
			setChoosenField("Email");
			data.username = "";
			setErrors({});
		} else {
			setChoosenField("Username");
			data.email = "";
			setErrors({});
		}
	};

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value }); // setting relevant value for the particular field

		const { name, value } = e.target;
		let newErrors = { ...errors };

		// Validate username and fullname

		// fullname validation will be considered only when the user is registering

		// Validate username

		if (name === "username") {
			if (!value) {
				newErrors.username = "Username is required";
			} else if (value.length < 3) {
				newErrors.username = "Username must have at least 3 characters";
			} else {
				delete newErrors.username; // Remove the error if it's valid
			}
		}

		// Validate fullname

		if (register && name === "fullname") {
			if (!value) {
				newErrors.fullname = "Fullname is required";
			} else if (value.length < 3) {
				newErrors.fullname = "Fullname must have at least 3 characters";
			} else {
				delete newErrors.fullname; // Remove the error if it's valid
			}
		}

		// validate email

		if (name === "email") {
			if (!value) {
				newErrors.email = "Email is required";
			} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
				newErrors.email = "Invalid email format";
			} else {
				delete newErrors.email; // Remove the error if it's valid
			}
		}

		// validate password

		if (name === "password") {
			if (!value) {
				newErrors.password = "Password is required";
			} else if (
				!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(
					value
				)
			) {
				newErrors.password =
					"Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.";
			} else {
				delete newErrors.password; // Remove the error if it's valid
			}
		}

		setErrors(newErrors); // update the error state
	};

	const resetForm = () => {
		setData(initialState);
	};

	const isFormValid = register
		? Object.keys(errors).length === 0 &&
		  JSON.stringify(data) !== JSON.stringify(initialState) &&
		  data.email !== "" &&
		  data.fullname !== "" &&
		  data.username !== "" &&
		  data.password !== ""
		: choosenField === "Username"
		? Object.keys(errors).length === 0 &&
		  JSON.stringify(data) !== JSON.stringify(initialState) &&
		  data.username !== "" &&
		  data.email === "" &&
		  data.password !== ""
		: Object.keys(errors).length === 0 &&
		  JSON.stringify(data) !== JSON.stringify(initialState) &&
		  data.email !== "" &&
		  data.username === "" &&
		  data.password !== "";

	const handleStateChange = () => {
		setRegister(!register);
	};

	const handleSubmit = async (e) => {
		// e.preventDefault();
		if (register) {
			try {
				setLoading(true);
				await axios
					.post("/auth/register", {
						fullname: data.fullname,
						username: data.username,
						email: data.email,
						password: data.password,
						themeSelected: "light",
						colorSelected: "",
						profilePicture: randomImage,
					})
					.then(() => checkAuthUser())
					.catch((error) => error.message);

				setLoading(false);
				toast.success("User Registered Successfully");
				navigate("/");
			} catch (error) {
				toast.error(error.response.data);
				setRegister(false);
			}
		} else {
			try {
				setLoading(true);
				await axios
					.post("/auth/login", {
						username: data.username,
						email: data.email,
						password: data.password,
					})
					.then(() => checkAuthUser());

				setLoading(true);
				toast.success("User Logged In Successfully");
				navigate("/");
			} catch (error) {
				toast.error(error.response.data);
			}
		}

		resetForm();
	};

	return (
		<div className="h-full lg:py-4 w-full flex justify-center items-center sm:p-7 3xl:p-10 overflow-x-hidden">
			{register ? (
				<Register
					errors={errors}
					handleStateChange={handleStateChange}
					data={data}
					handleChange={handleChange}
					isFormValid={isFormValid}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
			) : (
				<Authorize
					errors={errors}
					handleStateChange={handleStateChange}
					changeField={changeField}
					choosenField={choosenField}
					data={data}
					handleChange={handleChange}
					isFormValid={isFormValid}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default Authenticate;
