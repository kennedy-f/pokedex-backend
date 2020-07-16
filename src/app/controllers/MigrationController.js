import Pokemons from '../models/Pokemons';
import Types from '../models/Types';
import Weather from '../models/Weather';

import pokemons_old from '../models/pokemons.json';

class MigrationController {
	async pokemons(req, res) {
        const pokemons = pokemons_old.Sheet1.map(p => p);

		const result = pokemons.map(async p => {
			let pokemon, id_type_1, id_type_2, id_weather_1, id_weather_2;

            //Verifico se não há um semelhante no banco 
            pokemon = await Pokemons.findOne({ where: { name: p.Name } });
			if (pokemon === null) { 
                // Se não há começo a inserir 
                
                id_type_1 = await Types.findOne({ where: { name: p.Type_1 } });

                id_weather_1 = await Weather.findOne({
                    where: { name: p['Weather 1'] },
                });

                if ( p.Type_2 !== undefined ) { 
                    id_type_2 = await Types.findOne({ where: { name: p.Type_2 } });
                }

                if (p['Weather 2']) {
                    id_weather_2 = await Weather.findOne({
						where: { name: p['Weather 2'] },
					});
				}
				// Crio o objeto a ser salvo. 
                var pokemonSave = {
					name: p.Name,
					pokedex_number: p['Pokedex Number'],
					generation: p.Generation,
					evolution: p['Evolution Stage'],
					family_id: p.FamilyID !== undefined ? p.FamilyID : null,
					type_1:
						id_type_1.dataValues.id !== undefined
							? id_type_1.dataValues.id
							: null,
					type_2:
						id_type_2 !== undefined
							? id_type_2.dataValues.id
							: null,
					weather_1:
						id_weather_1.dataValues.id !== undefined
							? id_weather_1.dataValues.id
							: null,
					weather_2:
						id_weather_2 !== undefined
							? id_weather_2.dataValues.id
							: null,
					stat_total: p['STAT TOTAL'],
					atk: p['ATK'],
					def: p['DEF'],
					sta: p['STA'],
					legendary: p['Legendary'],
					cp1: p['100cp40'],
					cp2: p['100% CP @ 39'],
				};
                
                pokemon = await Pokemons.create(pokemonSave);
                
                
            }
            return pokemon; 
        });
        
		return res.json({ msg: 'sucesso ao migrar '});
	}

	async types(req, res) {
		var pokemons_array = pokemons_old.Sheet1.map(p => p.Type_1);
		var arr = pokemons_array.filter(function (elem, index, self) {
			return index === self.indexOf(elem);
		});
		const types = await arr.map(t =>
			Types.findOrCreate({ where: { name: t } })
		);

		return res.json(types);
	}

	async weathers(req, res) {
		var pokemons_array = pokemons_old.Sheet1.map(p => p['Weather 2']);

		var arr = pokemons_array.filter(function (elem, index, self) {
			return index === self.indexOf(elem);
		});

		const weathers = await arr.map(t =>
			Weather.findOrCreate({ where: { name: t } })
		);

		return res.json(weathers);
	}
}

export default new MigrationController();
