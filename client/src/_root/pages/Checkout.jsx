import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getBasketItems, getBasketTotal } from "../../lib/basketSlice";
import CheckoutProduct from "../../components/product/CheckoutProduct";
import Loader from "../../components/shared/Loader";
import { Link } from "react-router-dom";
import { getUser } from "../../lib/authSlice";

const Checkout = () => {
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
	const subTotal = useSelector(getBasketTotal);
	const cartItems = useSelector(getBasketItems);
	const user = useSelector(getUser);
	useMemo(() => {
		const groupedItems = cartItems.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});
		setGroupedItemsInBasket(groupedItems);
	}, [cartItems]);

	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-col items-center justify-center gap-2 pt-7 py-5">
				<h1 className="text-3xl font-medium">Welcome {user.fullname}</h1>
				<p className="text-xl font-medium">Subtotal: ₹ {subTotal}</p>
			</div>
			{cartItems.length === 0 && (
				<div className="flex flex-col gap-10 items-center justify-center pt-4">
					<Loader height="full" />
					<div className="flex flex-col gap-2 text-center">
						<p className="text-2xl">Your Cart Is Empty</p>
						<span className="text-lg">
							Please add some products to your basket.
						</span>
						<Link to={"/"} className={`button mt-4`}>
							Explore Trending Products
						</Link>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 gap-16 items-ceter pb-10 w-full max-w-[92%] m-auto ">
				{Object.entries(groupedItemsInBasket).map(([key, items]) => (
					<CheckoutProduct
						key={key}
						product={items[0]}
						quantity={items?.length}
					/>
				))}
			</div>
		</div>
	);
};

export default Checkout;
