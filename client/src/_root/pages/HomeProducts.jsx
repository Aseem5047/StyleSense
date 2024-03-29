import React from "react";
import { trendingData } from "../../data/productData";
import Product from "../../components/product/Product";
import Slider from "../../components/slider/Slider";
import { bannerImages } from "../../data/GetBannerImages";

const HomeProducts = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-5 md:gap-12 overflow-x-hidden pt-7 md:pt-10">
			<Slider bannerImages={bannerImages} />
			<div className="productLayout">
				{trendingData?.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default HomeProducts;
