import { Router } from 'express';
import AuthMiddleware from './app/middleware/auth';
import AuthController from './app/controllers/AuthController';

const routes = new Router();


routes.post('/signin', AuthController.signIn);

routes.post('/signup', AuthController.signUp);

routes.use(AuthMiddleware);

routes.get('/private', (req, res) => {
  res.status(200).send({});
});

module.exports = routes;