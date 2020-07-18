import Types from '../models/Types'; 

class TypesController { 
    async index(req, res) { 
        const types = await Types.findAll(); 
        return res.json(types); 
    }
}

export default new TypesController(); 