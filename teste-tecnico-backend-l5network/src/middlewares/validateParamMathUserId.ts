import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const mathUserIdParamSchema = z.string().uuid();

export function validateParamMathUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    mathUserIdParamSchema.parse(req.params.user_id);
    next();
  } catch (err) {
    throw new Error(
      "Something Wrong Happened in /src/middlewares/validateParamMathUserId method - validateParamMathUserId"
    );
  }
}
