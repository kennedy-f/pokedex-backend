import Types from '../models/Types'; 

class TypesController {
	async index(req, res) {
		const types = await Types.findAll();
		return res.json(types);
	}

	async show(req, res) {
		const { id } = req.params;
		const type = await Types.findByPk(id);
		return res.json(type);
	}

	async update(req, res) {
		const { id } = req.params;

		const type = await Weather.findByPk(id);
		if (!type) {
			return res.status(400).json({ error: 'Weather not found' });
		}

		const update = await type.update(req.body);

		return res.json(update);
	}
}

export default new TypesController(); 