import { Request, Response } from "express";
import { container } from "tsyringe";
import { InsertMathService } from "../../services/Math/InsertMathService";

class InsertMathController {
  async handle(req: Request, res: Response): Promise<Response> {
    const insertMathService = container.resolve(InsertMathService);

    const {user_id,calculation} = req.body;
    const response = await insertMathService.execute({user_id,calculation});

    return res.status(201).json(response);
  }
}

export { InsertMathController };
