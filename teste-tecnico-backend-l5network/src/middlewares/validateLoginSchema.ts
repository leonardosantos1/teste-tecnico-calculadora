import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ApplicationError } from "../error/ApplicationError";

const loginSchema = z.object({
  email: z.string().email().max(150),
  password: z.string().min(6).max(25),
});

export function validateLoginSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (err) {
    throw new ApplicationError(
      "Por favor insira Email/Senha validos",400
    );
  }
}
