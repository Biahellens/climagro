import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Device } from '../entities/Device';
import { User } from '../entities/User';

interface AuthenticatedRequest extends Request {
  currentUser?: User;
}

export class DeviceController {
  static async createDevice(req: AuthenticatedRequest, res: Response) {
    try {
      const { name, listCommands } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
      }

      if (!req.currentUser) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const deviceRepository = getRepository(Device);

      const device = new Device();
      device.name = name;
      device.listCommands = listCommands || []

      try {
        await deviceRepository.save(device);

        return res.status(201).json({ message: 'Dispositivo criado com sucesso', device });
      } catch (error) {
        console.error('Erro ao criar dispositivo:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async addCommand(req: AuthenticatedRequest, res: Response) {
    const deviceRepository = getRepository(Device);
    try {

        if (!req.currentUser) {
          return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        const authenticatedUser: User = req.currentUser;

        const deviceId = req.params.id;
        const { listCommands } = req.body;

        const device = await deviceRepository.findOne({
          where: {
            id: parseInt(deviceId),
          },
        });

        if (!device) {
            return res.status(404).json({ error: "Dispositivo não encontrado" });
        }

        const newCommands = listCommands.map((cmd: { userId: number; name: string; url: string; }, index: number) => ({
          id: Math.max(0, ...device.listCommands.map((cmd: { id: number; }) => cmd.id)) + index + 1,
          userId: { id: authenticatedUser.id },
          name: cmd.name,
          url: cmd.url
        }));

        device.listCommands = [...device.listCommands, ...newCommands];
        const updatedDevice = await deviceRepository.save(device);

        return res.status(200).json(updatedDevice);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getDevicesByUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.currentUser) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const deviceRepository = getRepository(Device);
      const authenticatedUser: User = req.currentUser;

      const devices = await deviceRepository.createQueryBuilder("device")
          .leftJoinAndSelect("device.listCommands", "command")
          .where("command.userId = :userId", { userId: { id: authenticatedUser.id} })
          .getMany();

      console.info(devices)
      return res.status(200).json(devices);
    } catch (error) {
      console.error('Erro ao obter dispositivos do usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor'});
    }
  }

  static async deleteDevice(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.currentUser) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const deviceId = req.params.id;

      const deviceRepository = getRepository(Device);
      const device = await deviceRepository.findOne({
        where: {
          id: parseInt(deviceId),
        },
      });

      if (!device) {
        return res.status(404).json({ message: 'Dispositivo não encontrado' });
      }

      await deviceRepository.save(device);

      return res.status(200).json({ message: 'Dispositivo excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir dispositivo:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getAllDevices(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.currentUser) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const devices = await getRepository(Device).find();
      return res.status(200).json({ devices });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
