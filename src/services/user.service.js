import {API_URL} from '../network.js';
import axios from "axios";

const signIn = async (data) => {
	return await axios.post(`${API_URL}/api/login`,data).then(res => res);
}

// const signUp = async (data) => {
// 	return await axios.post(`${API_URL}/account/signup`,data).then(res => res)
// }


export {
	signIn,
	// signUp
}