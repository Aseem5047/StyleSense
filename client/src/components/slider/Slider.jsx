import React, { useEffect, useRef, useState } from "react";

import { GetSlideState } from "../../utils/GetSlideState";
import NavigationButtons from "./NavigationButtons";

const Slider = ({ bannerImages }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const sliderRef = useRef(null);

	const lastIndex = bannerImages.length - 1;

	useEffect(() => {
		setCurrentIndex((prev) =>
			prev > lastIndex ? 0 : prev < 0 ? lastIndex : prev
		);
	}, [currentIndex]);

	useEffect(() => {
		const slider = setInterval(() => {
			setCurrentIndex((prev) => prev + 1);
		}, 7500);

		return () => clearInterval(slider);
	}, [currentIndex]);

	const handleSlideState = (adjustedIndex) => {
		return GetSlideState(adjustedIndex, currentIndex, lastIndex);
	};

	const nextBanner = () => {
		setCurrentIndex((prev) => prev + 1);
	};

	const previousBanner = () => {
		setCurrentIndex((prev) => prev - 1);
	};

	const imagesDisplayed = [
		currentIndex - 2,
		currentIndex - 1,
		currentIndex,
		currentIndex + 1,
		currentIndex + 2,
	];

	return (
		<div
			className="relative flex flex-col items-center justify-center w-full h-full px-4 sm:px-7 "
			ref={sliderRef}
		>
			<div className="relative flex items-center ">
				{/* left navigation button */}
				<NavigationButtons
					direction={"left"}
					nextItem={nextBanner}
					previousItem={previousBanner}
				/>

				{/* main slider images */}
				{imagesDisplayed.map((currentImageIndex) => {
					let adjustedIndex =
						(currentImageIndex + bannerImages.length) % bannerImages.length;

					let slideState = handleSlideState(adjustedIndex);

					return (
						<article
							key={bannerImages[adjustedIndex]}
							className={`${slideState}`}
						>
							<img
								src={bannerImages[adjustedIndex]}
								alt=""
								className={`rounded-xl shadow-lg h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[275px] object-cover cursor-pointer`}
								onClick={() =>
									setCurrentIndex(
										(currentImageIndex + bannerImages.length) %
											bannerImages.length
									)
								}
							/>
						</article>
					);
				})}
				{/* right navigation button */}
				<NavigationButtons
					direction={"right"}
					nextItem={nextBanner}
					previousItem={previousBanner}
				/>
			</div>
		</div>
	);
};

export default Slider;
