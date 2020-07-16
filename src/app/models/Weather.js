import { Model, Sequelize } from 'sequelize';

class Weather extends Model {
	static init(sequelize) {
		super.init(
			{ name: Sequelize.STRING },
			{
				sequelize,
				tableName: 'Weather',
				modelName: 'Weather'
			}
		);
		return this; 
	}
}
export default Weather;