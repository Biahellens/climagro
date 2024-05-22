import { Request, Response } from 'express';
import { User } from '../entities/User';
import { encrypt } from "../helpers/helpers";
import { AppDataSource } from '../data-source';
import * as cache from "memory-cache";

class UserController {
  static async createUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = (await AppDataSource).getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Já existe uma conta com esse e-mail" });
    }

    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.email = email;
    user.password = encryptedPassword;

    try {
      const userRepository = (await AppDataSource).getRepository(User);
      await userRepository.save(user);

      const token = encrypt.generateToken({ id: user.id });

      return res.status(201).json({ message: "Usuário criado com sucesso", token, user })
    } catch(error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = (await AppDataSource).getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }

}

export default UserController;
