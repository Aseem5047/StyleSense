import React from "react";
import Product from "../../components/product/Product";
import { mobileData } from "../../data/mobileData";

const Mobile = () => {
	return (
		<div className="productLayout">
			{mobileData?.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
};

export default Mobile;
