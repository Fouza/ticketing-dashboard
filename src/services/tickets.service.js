import {tickets$} from "../mockdata/tickets";
import {categories$} from "../mockdata/categories";

const getTickets = async ()=> {
    const pots = await tickets$.then(res => res)
	return pots
}

const getCategories = async () => {
	const categories = await categories$.then(res => res)
	return categories
}


export {
    getTickets,
	getCategories
}