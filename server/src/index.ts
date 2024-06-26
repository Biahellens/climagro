import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { userRouter } from './routes/user.routes';
import { deviceRouter } from './routes/devices.routes';
import { telnetRouter } from './routes/telnet.routes';

(async () => {
  await createConnection();

  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );

  app.use(express.json());

  // Rotas para o UserController
  app.use("/user", userRouter);

  // Rotas para o DeviceController
  app.use("/devices", deviceRouter);

  // Rotas para o telnetController
  app.use("/telnet", telnetRouter);

  app.get('/', (req, res) => {
    return res.json('Established connection!');
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})();
