import React from "react";
import { Link, useParams } from "react-router-dom";
import { trendingData } from "../../data/productData";
import { laptopData } from "../../data/laptopData";
import { mobileData } from "../../data/mobileData";
import { useDispatch } from "react-redux";
import { addItem } from "../../lib/basketSlice";

const ProductDetail = () => {
	let { id } = useParams();
	let category = id.split("_")[0];
	const dispatch = useDispatch();
	let currentProduct =
		category === "homeProduct"
			? trendingData.find((product) => product.id === id)
			: category === "laptops"
			? laptopData.find((product) => product.id === id)
			: category === "mobiles" &&
			  mobileData.find((product) => product.id === id);

	const { detail, image, price, rating, title, type } = currentProduct;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-1 h-full w-full 3xl:w-1/2 items-center justify-center gap-4 lg:gap-7 px-5 lg:px-7 py-7">
			{/* product image */}
			<img
				src={image[0]}
				alt={title}
				className=" aspect-video w-full h-full  object-fill md:object-cover md:aspect-square max-h-[475px] transition-all duration-500 ease-in-out delay-500 rounded-xl mx-auto"
			/>

			{/* product info */}
			<div className="flex w-full flex-col items-start justify-start lg:justify-center h-full py-2 gap-4 lg:py-0">
				<div className="flex items-center flex-wrap gap-4">
					<h1 className="text-xl font-semibold">{title}</h1>
					<span className="text-xl font-semibold">|</span>
					<span className="text-lg font-semibold">₹ {price}</span>
				</div>

				<div className="flex items-center">
					<span className="text-base font-semibold mr-2">Ratings</span>
					{Array(Math.round(rating ? rating : 0))
						.fill()
						.map((_, index) => (
							<span className="!m-0" key={index}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6"
								>
									<path
										fillRule="evenodd"
										d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
						))}
				</div>

				<span className="text-sm font-semibold">Category {type}</span>

				<span className="text-base font-semibold pr-10">{detail}</span>

				<div className="flex gap-3 pt-4">
					<Link to="/checkout" className="button !px-7">
						Visit Cart
					</Link>
					<button
						className="button !px-7"
						onClick={() => dispatch(addItem(currentProduct))}
					>
						Add To Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
