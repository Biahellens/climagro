import express from 'express';
import { TelnetController } from '../controllers/telnet.controller';
import { authentification } from '../middleware/authentification';

const Router = express.Router();

// Rotas para telnet
Router.get('/postCommand', authentification, TelnetController.telnetResponse);


export { Router as telnetRouter }