import { Op } from 'sequelize';
import Pokemons from '../models/Pokemons';
import Types from '../models/Types';
class PokemonsController {
	async index(req, res) {
		const {
			page = 1,
			name = '',
			type = '',
			order = 'ASC',
			pokedex_number = '',
			filter = 'pokedex_number',
		} = req.query;

		var typeId = await Types.findOne({where : { name : type }});
		
		var whereFilter = {};
		if (type) {
			whereFilter = {
				[Op.or]: [
					{
						type_1: {
							[Op.eq]: [typeId.id],
						},
					},
					{
						type_2: {
							[Op.eq]: [typeId.id],
						},
					},
				],
			};
		}
		if (name) {
			whereFilter.name = { [Op.substring]: name };
		}
		if (pokedex_number) {
			whereFilter.pokedex_number = { [Op.substring]: pokedex_number };
		}

		const pokemons = await Pokemons.findAndCountAll({
			where: whereFilter,
			order: [[filter, order]],
			attributes: ['id', 'name', 'pokedex_number'],
			include: [
				{
					model: Types,
					as: 'type1',
					attributes: ['name'],
				},
				{
					model: Types,
					as: 'type2',
					attributes: ['name'],
				},
			],
			limit: 20,
			offset: (page - 1) * 20,
		});
		return res.json(pokemons);
	}

	async store(req, res) {
		const {
			name,
			pokedex_number,
			generation,
			evolution,
			family_id,
			type_1,
			type_2,
			weather_1,
			weather_2,
			stat_total,
			atk,
			def,
			sta,
			legendary,
			cp1,
			cp2,
		} = req.body;

		const pokemon = Pokemons.create({
			name,
			pokedex_number,
			generation,
			evolution,
			family_id,
			type_1,
			type_2,
			weather_1,
			weather_2,
			stat_total,
			atk,
			def,
			sta,
			legendary,
			cp1,
			cp2,
		});

		if (Error) {
			console.log(next(err));
			return res
				.status(400)
				.json({ 'error-msg': next(err), msg: 'failed to creat' });
		}

		return res.json(pokemon);
	}

	async update(req, res) {
		const { pokedex_number } = req.body;

		const pokemonExist = await Pokemons.findOne({
			where: { pokedex_number },
		});

		if (!pokemonExist) {
			return res.status(401).json({ error: 'Pokemon does not exist' });
		}

		const pokemon = await pokemonExist.update(req.body);

		return res.json(pokemon);
	}
}

export default new PokemonsController();