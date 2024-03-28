export const GetSlideState = (adjustedIndex, currentIndex, lastIndex) => {
	if (adjustedIndex === currentIndex) return "visible";
	if (
		adjustedIndex === currentIndex + 1 ||
		(currentIndex === lastIndex && adjustedIndex === 0)
	)
		return "next";
	if (
		adjustedIndex === currentIndex + 2 ||
		(currentIndex === lastIndex && adjustedIndex === 1) ||
		(currentIndex === lastIndex - 1 && adjustedIndex === 0)
	)
		return "nextNext";
	if (
		adjustedIndex === currentIndex - 1 ||
		(currentIndex === 0 && adjustedIndex === lastIndex)
	)
		return "previous";
	if (
		adjustedIndex === currentIndex - 2 ||
		(currentIndex === 0 && adjustedIndex === lastIndex - 1) ||
		(currentIndex === 1 && adjustedIndex === lastIndex)
	)
		return "previousPrev";
	else {
		return "hidden";
	}
};
