import { Router } from 'express';
import AuthMiddleware from './app/middleware/auth';
import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/signin', AuthController.signIn);

routes.post('/signup', AuthController.signUp);

routes.use(AuthMiddleware);

routes.get('/user/:id', UserController.find);

export default routes;