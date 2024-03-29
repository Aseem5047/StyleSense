import { Routes, Route } from "react-router-dom";
import axios from "axios";
import AuthLayout from "./_auth/AuthLayout";
import Authenticate from "./_root/pages/Authenticate";
import RootLayout from "./_root/RootLayout";
import HomeProducts from "./_root/pages/HomeProducts";
import Computers from "./_root/pages/Computers";
import Mobile from "./_root/pages/Mobile";
import Checkout from "./_root/pages/Checkout";
import ProductDetail from "./_root/pages/ProductDetail";
import { useEffect, useState } from "react";
import Loader from "./components/shared/Loader";
import { getUser } from "./lib/authSlice";
import { useSelector } from "react-redux";
import Profile from "./_root/pages/Profile";

export default function App() {
	axios.defaults.baseURL = "http://127.0.0.1:5000";

	axios.defaults.withCredentials = true;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2500);
	}, []);

	const user = useSelector(getUser);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="h-screen">
					<Routes>
						{/* Public Routes */}
						<Route element={<AuthLayout />}>
							<Route path="/authenticate" element={<Authenticate />} />
						</Route>

						{/* Private Routes */}
						<Route element={<RootLayout />}>
							{/* Home Routes */}
							<Route index element={<HomeProducts />} />

							{/* Other Routes */}
							<Route path="/laptops" element={<Computers />} />
							<Route path="/mobiles" element={<Mobile />} />
							<Route path="/checkout" element={<Checkout />} />
							<Route path="/products/:id" element={<ProductDetail />} />
							<Route path="/user/profile/:id" element={<Profile />} />
						</Route>
					</Routes>
				</div>
			)}
		</>
	);
}
