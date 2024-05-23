import { Request, Response } from 'express';
import { User } from '../entities/User';
import { Telnet } from 'telnet-client';

interface AuthenticatedRequest extends Request {
  currentUser?: User;
}

export class TelnetController {
  static async telnetResponse(req: AuthenticatedRequest, res: Response) {
    try {
      const { host, port, command } = req.body;

      const connection = new Telnet();

      if (!req.currentUser) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      await connection.connect({
        host: host,
        port: port,
      });

      const response = await connection.send(command);
      await connection.end();

      res.json({ response });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
