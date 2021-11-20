export const pageCount = (array, eltDisplayed) => {
	if(!eltDisplayed) return "Elements displayed prop is required";
	let pageCount = array.length/eltDisplayed
	return Math.ceil(pageCount);
}