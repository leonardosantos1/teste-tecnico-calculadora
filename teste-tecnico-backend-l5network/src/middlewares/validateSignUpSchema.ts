import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ApplicationError } from "../error/ApplicationError";

const signUpSchema = z.object({
  name: z.string().min(3).max(150),
  email: z.string().email().max(150),
  password: z.string().min(6).max(25),
});

export function validateSignUpSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    signUpSchema.parse(req.body);
    next();
  } catch (err) {
    throw new ApplicationError("Something Wrong Happened in /src/middlewares/validateSignUpSchema method - validateSignUpSchema", 400);
  }
}
