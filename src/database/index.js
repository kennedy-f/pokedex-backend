import Sequelize from 'sequelize';

import Admin from '../app/models/Admin';
import Pokemons from '../app/models/Pokemons';
import Types from '../app/models/Types';
import Weather from '../app/models/Weather';

import databaseConfig from '../config/database';

const models = [Admin, Pokemons, Types, Weather];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models
			.map(model => model.init(this.connection))
			.map(
				model => model.associate && model.associate(this.connection.models)
			);
	}
}

export default new Database();
