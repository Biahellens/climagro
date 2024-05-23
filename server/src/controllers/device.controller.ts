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
            console.log('Usuário não autenticado');
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        const { id, listCommands } = req.body;

        console.log('ID do dispositivo:', id);
        console.log('Comandos recebidos:', listCommands);

        const device = await deviceRepository.findOne({
            where: {
                id: id,
            },
        });

        if (!device) {
            console.log('Dispositivo não encontrado');
            return res.status(404).json({ error: "Dispositivo não encontrado" });
        }

        if (!device.listCommands) {
            device.listCommands = [];
        }

        const newCommands = listCommands.map((cmd: { name: string; url: string; }) => ({
            name: cmd.name,
            url: cmd.url,
        }));

        console.log('Novos comandos:', newCommands);

        device.listCommands = [...device.listCommands, ...newCommands];
        const updatedDevice = await deviceRepository.save(device);

        console.log('Dispositivo atualizado:', updatedDevice);

        const responseObject = {
            id: updatedDevice.id,
            name: updatedDevice.name,
            listCommands: updatedDevice.listCommands.map(command => ({
                name: command.name,
                url: command.url
            }))
        };

        return res.status(200).json(responseObject);
    } catch (error) {
        console.error('Erro ao adicionar comando:', error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}

  static async getDevicesByUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.currentUser) {
          return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const authenticatedUser: User = req.currentUser;

      const device = await getRepository(Device)
          .createQueryBuilder("device")
          .leftJoinAndSelect("device.listCommands", "command")
          .where("command.userId = :userId", { userId: authenticatedUser.id })
          .getOne();

      if (!device) {
          return res.status(404).json({ message: 'Nenhum dispositivo encontrado para este usuário' });
      }

      const firstCommand = device.listCommands[0]; 
      if (!firstCommand) {
          return res.status(404).json({ message: 'Nenhum comando encontrado para este dispositivo' });
      }

      const firstCommandUserId = firstCommand.user.id;

      console.info("ID do usuário associado ao primeiro comando:", firstCommandUserId);
      return res.status(200).json({ userId: firstCommandUserId });
  } catch (error) {
      console.error('Erro ao obter ID do usuário do primeiro comando:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
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
          id: deviceId,
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

  static async getById(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.currentUser) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const { id } = req.params;

      const device = await getRepository(Device).findOne({
        where: {
          id: id,
        },
      });

      if (!device) {
        return res.status(404).json({ message: 'Dispositivo não encontrado' });
      }

      return res.status(200).json(device)
    } catch (error) {
      console.error(error);
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
