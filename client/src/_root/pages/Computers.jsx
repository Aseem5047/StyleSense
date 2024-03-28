import React from "react";
import Product from "../../components/product/Product";
import { laptopData } from "../../data/laptopData";

const Computers = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 items-ceter py-5 w-full max-w-[92%]">
			{laptopData?.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
};

export default Computers;
