import Weather from '../models/Weather'; 

class WeatherController {
	async index(req, res) {
		const weather = await Weather.findAll();
		return res.json(weather);
	}
}

export default new WeatherController(); 