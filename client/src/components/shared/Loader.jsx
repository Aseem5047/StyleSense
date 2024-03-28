import React from "react";

const Loader = ({ height = "screen" }) => {
	return (
		<>
			<div className={`h-${height} flex items-center justify-center`}>
				<img
					src="\src\assets\Loading.gif"
					alt=""
					className="m-auto rounded-xl w-80 h-80"
				/>
			</div>
		</>
	);
};

export default Loader;
