import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllMathsService } from "../../services/Math/FindAllMathsService";

class FindAllMathsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllMathsService = container.resolve(FindAllMathsService);

    const maths = await findAllMathsService.execute();

    return res.status(200).json(maths);
  }
}

export { FindAllMathsController };
