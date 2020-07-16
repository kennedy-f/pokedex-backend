import Admin from '../models/Admin'; 

class AdminController { 
    async create (req, res) { 
        const { name, email, password } = req.body; 

        const adminExist = await Admin.findOne({ where : { email } }); 

        if (adminExist) { 
            return res.status(400).json({ error : 'User already exists. '}); 
        }
        const user = await Admin.create({
                name,
                password,
                email
            });

        return res.json(user); 
    }
}

export default new AdminController(); 