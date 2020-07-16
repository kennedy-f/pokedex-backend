import jwt from 'jsonwebtoken';

import Admin from '../models/Admin'; 

import authConfig from '../../config/auth'; 

class SessionController { 
    async login(req, res) { 
        const { email , password } = req.body; 

        const admin = await Admin.findOne({ where : { email }}); 

        if (!admin) { 
            return res.status(401).json({ error : 'User not found'}); 
        }

        if (!(await admin.checkPassword(password))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

        const { id, name,  } = admin; 

        return res.json({
			user: {
				id,
				name,
				email,
			},
			token: jwt.sign({ id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
    }
}

export default new SessionController(); 