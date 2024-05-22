import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { encrypt } from "../helpers/helpers";
import * as cache from 'memory-cache';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
      }

      const userRepository = (await AppDataSource).getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Senha Inválida" });
      }

      const token = encrypt.generateToken({ id: user.id });

      return res.status(200).json({ message: "Login realizado com sucesso", user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const authToken = req.headers.authorization;

      if (!authToken) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      cache.put(authToken, true);

      return res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}