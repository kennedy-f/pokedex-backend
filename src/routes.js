import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import MigrationController from './app/controllers/MigrationController';
import PokemonsController from './app/controllers/PokemonsController';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', PokemonsController.index);
routes.post('/user/create', AdminController.create);
routes.post('/user/login', SessionController.login);

routes.use(authMiddleware);

    routes.post('/pokemons', PokemonsController.store);
    routes.put('/pokemons', PokemonsController.update); 

    //podem ser acessadas por get (nao esperam nenhum dado). 
    routes.post('/migration/pokemons', MigrationController.pokemons);
    routes.post('/migration/types', MigrationController.types);
    routes.post('/migration/weather', MigrationController.weathers);

export default routes;
