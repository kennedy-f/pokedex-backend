import Weather from '../models/Weather'; 

class WeatherController {
	async index(req, res) {
		const weather = await Weather.findAll();
		return res.json(weather);
	}

	async show ( req, res ) { 
		const { id } = req.params; 
		const weather = await Weather.findByPk(id);
		return res.json(weather); 
	}

	async update (req, res){ 
		const { id } = req.params; 

		const weather = await Weather.findByPk(id); 
		if ( !weather ){ 
			return res.status(400).json({ 'error' : "Weather not found"}); 
		}


		const update = await weather.update(req.body); 

		return res.json(update); 
	}
}

export default new WeatherController(); 