import Admin from '../models/Admin';
import Types from '../models/Types';
import Weather from '../models/Weather';

class AdminController {
	async create(req, res) {
		const { name, email, password } = req.body;

		const adminExist = await Admin.findOne({ where: { email } });

		if (adminExist) {
			return res.status(400).json({ error: 'User already exists. ' });
		}
		const user = await Admin.create({
			name,
			password,
			email,
		});

		return res.json(user);
	}

	async typesAndWeather(req, res) {
		const types = await Types.findAll();
        const weathers = await Weather.findAll();
		return res.json({ types, weathers });
	}
}

export default new AdminController();
