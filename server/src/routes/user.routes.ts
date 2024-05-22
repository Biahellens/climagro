import express from 'express';
import UserController from '../controllers/user.controller';
import { AuthController } from '../controllers/auth.controller';

const Router = express.Router();

// Rotas para o user
Router.post('/createdAccount', UserController.createUser);
Router.get('/users', UserController.getUsers);
Router.post('/login', AuthController.login);
Router.post('/logout', AuthController.logout);

export { Router as userRouter }