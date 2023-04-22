import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ApplicationError } from "../error/ApplicationError";

const userIdParamSchema = z.string().uuid();

export function validateParamUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    userIdParamSchema.parse(req.params.id)
    next();
  } catch (err) {
    throw new ApplicationError("Por favor envio um Id valido!", 400)
  }
}
