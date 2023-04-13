import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userIdParamSchema = z.string().uuid();

export function validateParamUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    userIdParamSchema.parse(req.params.user_id);
    next();
  } catch (err) {
    throw new Error(
      "Something Wrong Happened in /src/middlewares/validateParamUserId method - validateParamUserId"
    );
  }
}
