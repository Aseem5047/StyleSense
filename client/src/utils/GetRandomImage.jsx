// randomImageUtils.js

const GetRandomImage = (imageList) => {
	const storedImage = localStorage.getItem("randomImage");
	let randomImage = "";

	if (!storedImage) {
		const randomIndex = Math.floor(Math.random() * imageList.length);
		randomImage = imageList[randomIndex];
		localStorage.setItem("randomImage", randomImage);
	} else {
		randomImage = storedImage;
	}

	return randomImage;
};

export default GetRandomImage;
