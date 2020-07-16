import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt'; 

export default class Admin extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email : Sequelize.STRING, 
				password: Sequelize.VIRTUAL,
				password_hash : Sequelize.STRING,
			},
			{
				sequelize,
				tableName :"Admin"
			}
		);

		this.addHook('beforeSave', async (user) => { 
			if ( user.password ) { 
				user.password_hash = await bcrypt.hash(user.password, 8);
			}
		}); 

		
		return this; 
	}
	checkPassword(password) { 
		return bcrypt.compare(password, this.password_hash); 
	}
}

