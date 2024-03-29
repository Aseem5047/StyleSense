import React from "react";
import Product from "../../components/product/Product";
import { laptopData } from "../../data/laptopData";

const Computers = () => {
	return (
		<div className="productLayout">
			{laptopData?.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
};

export default Computers;
