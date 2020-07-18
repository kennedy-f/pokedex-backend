import { Model, Sequelize } from 'sequelize';

class Types extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
			},
			{
				sequelize,
                tableName: 'Types'
			}
		);
		return this; 
	}
}

export default Types; 