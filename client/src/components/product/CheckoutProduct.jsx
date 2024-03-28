import React from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../lib/basketSlice";
import toast from "react-hot-toast";
import useThemeToggle from "../../context/ThemeToggle";
import { Link } from "react-router-dom";

const CheckoutProduct = ({ product, quantity }) => {
	const { id, detail, image, price, rating, title } = product;
	const dispatch = useDispatch();
	const { theme } = useThemeToggle();
	const handleAddToCart = () => {
		console.log("adding item to card");
		try {
			dispatch(addItem(product));
			toast.success(`Product added to Cart`);
		} catch (error) {
			toast.error("Product was not Added to Cart");
		}
	};

	const handleRemoveItem = (itemId) => {
		console.log(itemId);
		try {
			dispatch(removeItem(itemId));
			toast.success("Item Removed");
		} catch (error) {
			toast.error("Something went wrong while removing item");
		}
	};

	return (
		<div
			className={`flex flex-col md:flex-row xl:w-3/4 3xl:w-1/2 mx-auto items-center gap-12 shadow-lg py-7 px-5 rounded-xl`}
		>
			{/* left side image */}
			<Link
				to={`/products/${id}`}
				className="transition-all duration-500 hover:scale-105"
			>
				<img
					src={image[0]}
					alt=""
					className="w-full h-72 object-cover aspect-video rounded-xl"
				/>
			</Link>
			{/* right side details */}
			<div className="flex flex-col flex-1 items-start md:w-1/2">
				<div className="flex flex-col items-start justify-center">
					<h1 className="text-xl font-medium">{title}</h1>
					<div className="flex gap-1 items-center">
						{Array(rating)
							.fill()
							.map((_, index) => (
								<p key={index}>⭐</p>
							))}
					</div>
					<span className="font-medium">Quantity x {quantity}</span>
					<span className="font-medium">₹ {price}</span>
				</div>

				<p className="text-start line-clamp-5 mt-2">{detail}</p>
				<div className="flex items-center justify-start gap-2 pt-4">
					<button className={`button`} onClick={() => handleAddToCart(id)}>
						Add More
					</button>
					<button className={`button`} onClick={() => handleRemoveItem(id)}>
						Remove Item
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutProduct;
