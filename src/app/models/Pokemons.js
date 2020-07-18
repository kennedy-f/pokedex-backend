import { Model, Sequelize } from 'sequelize';

class Pokemons extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				pokedex_number: Sequelize.STRING,
				generation: Sequelize.STRING,
				evolution: Sequelize.STRING,
				family_id: Sequelize.INTEGER,
				type_1: Sequelize.INTEGER,
				type_2: Sequelize.INTEGER,
				weather_1: Sequelize.INTEGER,
				weather_2: Sequelize.INTEGER,
				stat_total: Sequelize.STRING,
				atk: Sequelize.STRING,
				def: Sequelize.STRING,
				sta: Sequelize.STRING,
				legendary: Sequelize.STRING,
				cp1: Sequelize.STRING,
				cp2: Sequelize.STRING,
				status: Sequelize.STRING
			},
			{
				sequelize,
				tableName: 'Pokemons',
			}
		);
		return this; 
	}

	static associate(models) { 
		this.belongsTo(models.Types, { foreignKey : "type_1", as : 'type1'});
		this.belongsTo(models.Types, { foreignKey: 'type_2', as: 'type2' });
	}
}

export default Pokemons;
