import express from 'express';
import { DeviceController } from '../controllers/device.controller';
import { authentification } from '../middleware/authentification';

const Router = express.Router();

// Rotas para dispositivos
Router.get('/allDevices', authentification, DeviceController.getAllDevices);
Router.post('/createDevice', authentification, DeviceController.createDevice);
Router.get('/getDevicesByUser', authentification, DeviceController.getDevicesByUser);
Router.delete('/:id/deleted', authentification, DeviceController.deleteDevice);
Router.put("/:id/addCommands", authentification, DeviceController.addCommand);
Router.get('/getById/:id', authentification, DeviceController.getById);


export { Router as deviceRouter }