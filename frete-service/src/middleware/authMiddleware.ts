import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Token não fornecido" });

  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token mal formatado" });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "JWT_SECRET não configurado" });
    const decoded = jwt.verify(token, secret) as any;
    req.user = decoded.user ?? decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Token inválido" });
  }
};