/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request {
  currentUser?: any;
}
export const authentification = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const secret = process.env.JWT_SECRET ?? "defaultSecret";
  try {
    const decode = jwt.verify(token, secret);
    req.currentUser  = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Não autorizado" });
  }
};
