import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const mathSchema = z.object({
  user_id: z.string().uuid(),
  calculation: z.string().min(3),
});

export function validateMathSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    mathSchema.parse(req.body);
    next();
  } catch (err) {
    throw new Error(
      "Something Wrong Happened in /src/middlewares/validateMathSchema method - validateMathSchema"
    );
  }
}
