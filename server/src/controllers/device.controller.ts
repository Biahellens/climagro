import { Request, Response } from 'express';
import { Equal, getRepository } from 'typeorm';
import { Device } from '../entities/Device';
import { User } from '../entities/User';
import { Command } from '../entities/Command';

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
    const commandRepository = getRepository(Command);

    try {
      if (!req.currentUser) {
        console.log('Usuário não autenticado');
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const { id, listCommands } = req.body;
      const authenticatedUser: User = req.currentUser;

      const device = await deviceRepository.findOne({
        where: { id: id },
      });

      if (!device) {
        console.log('Dispositivo não encontrado');
        return res.status(404).json({ error: "Dispositivo não encontrado" });
      }

      const newCommands = listCommands.map((cmd: { name: string; url: string }) => {
        const command = new Command();
        command.name = cmd.name;
        command.url = cmd.url;
        command.device = device;
        command.user = authenticatedUser;
        return command;
      });

      const savedCommands = await commandRepository.save(newCommands);

      const simplifiedCommands = savedCommands.map((command: Command) => ({
        id: command.id,
        name: command.name,
        url: command.url,
        deviceId: device.id,
        userId: authenticatedUser.id,
      }));

      return res.status(200).json(simplifiedCommands);
    } catch (error) {
      console.error('Erro ao adicionar comando:', error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getDevicesByUser(req: AuthenticatedRequest, res: Response) {
    const commandRepository = getRepository(Command);
    try {
        if (!req.currentUser) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        const authenticatedUser: User = req.currentUser;

        console.log('ID do usuário autenticado:', authenticatedUser.id);

        const commands = await commandRepository.find({
            where: {
                user: Equal(authenticatedUser.id)
            },
            relations: ['device', 'user']
        });

        console.log('Comandos encontrados:', commands);

        const serializedCommands = commands.map(command => ({
            id: command.id,
            name: command.name,
            url: command.url,
            deviceId: command.device.id,
            userId: command.user.id
        }));

        return res.status(200).json(serializedCommands);
    } catch (error) {
        console.error('Erro ao obter dispositivos do usuário:', error);
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
