const axios = require('axios');
const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?"


export default class Api {

	static get = async (url) => {
		return axios.get(baseUrl+url);
	};

}
