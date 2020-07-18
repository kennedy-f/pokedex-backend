import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import MigrationController from './app/controllers/MigrationController';
import PokemonsController from './app/controllers/PokemonsController';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import TypesController from './app/controllers/TypesController';
import WeatherController from './app/controllers/WeatherController';

const routes = new Router();

routes.get('/', PokemonsController.index);
routes.post('/user/create', AdminController.create);
routes.post('/user/login', SessionController.login);

routes.get('/types', TypesController.index);
routes.get('/weather', WeatherController.index);

routes.use(authMiddleware);

routes.get('/ad/pokemons', PokemonsController.adIndex);
routes.get('/ad/pokemons/:id', PokemonsController.adShow);
routes.post('/pokemons', PokemonsController.store);
routes.put('/pokemons', PokemonsController.update);
routes.delete('/pokemons', PokemonsController.delete);

routes.get('/ad/type/weather', AdminController.typesAndWeather);

//podem ser acessadas por get (nao esperam nenhum dado).
routes.post('/migration/pokemons', MigrationController.pokemons);
routes.post('/migration/types', MigrationController.types);
routes.post('/migration/weather', MigrationController.weathers);

export default routes;
