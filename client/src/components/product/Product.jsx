import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../lib/basketSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useThemeToggle from "../../context/ThemeToggle";

const Product = ({ product }) => {
	const { theme } = useThemeToggle();
	const { detail, image, price, rating, title } = product;
	const [showDetails, setShowDetails] = useState(false);
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		try {
			dispatch(addItem(product));
			toast.success(`Product added to Cart`);
		} catch (error) {
			toast.error("Product was not Added to Cart");
		}
	};

	return (
		<div
			className={`flex flex-col items-center justify-between gap-2 py-5 hover:scale-105 transition-all duration-500 cursor-pointer min-h-full shadow-lg rounded-xl`}
		>
			<Link
				to={`/products/${product.id}`}
				className="flex flex-col items-center justify-center gap-4 w-full"
			>
				<div className="flex flex-col items-center w-full justify-center text-center">
					{/* Title */}
					<p className="text-xl font-semibold overflow-x-hidden text-ellipsis whitespace-nowrap w-full px-7">
						{title}
					</p>
					{/* Price */}
					<span className="text-lg font-medium">Price ₹ {price}</span>
					{/* Rating */}
					<div className="flex gap-1 items-center">
						{Array(rating)
							.fill()
							.map((_, index) => (
								<p key={index}>⭐</p>
							))}
					</div>
				</div>
				{showDetails ? (
					<div className="py-2 px-7 flex-1">
						<span className="text-justify text-lg">{detail}</span>
					</div>
				) : (
					<>
						{/* Image */}
						<img
							src={image[0]}
							alt=""
							className="w-4/5 h-72 object-cover aspect-square rounded-xl"
						/>
					</>
				)}
			</Link>

			<div className="grid grid-cols-2 items-center gap-2 mt-4">
				<button className={`button`} onClick={handleAddToCart}>
					Add To Cart
				</button>
				<button
					className={`button`}
					onClick={() => setShowDetails((prev) => !prev)}
				>
					{showDetails ? "Show Product" : "Show Details"}
				</button>
			</div>
		</div>
	);
};

export default Product;
