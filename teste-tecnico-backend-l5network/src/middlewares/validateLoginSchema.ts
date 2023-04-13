import { Request, Response, NextFunction } from "express";
import { z } from "zod";

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
    throw new Error(
      "Something Wrong Happened in /src/middlewares/validateLoginSchema method - validateLoginSchema"
    );
  }
}
