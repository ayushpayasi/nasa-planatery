import axios from "axios";

const API_KEY = "gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7";


export const getPlanetaryDetails = (params = {}) => {
	params = { ...params, api_key: API_KEY };
	let search = new URLSearchParams(params);
	return axios.get(
		`https://api.nasa.gov/planetary/apod?${search.toString()}`
	);
};
