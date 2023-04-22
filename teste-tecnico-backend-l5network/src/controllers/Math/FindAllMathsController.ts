import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllMathsService } from "../../services/Math/FindAllMathsService";
import { getPaginatedData } from "../../utils/pagination";

class FindAllMathsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllMathsService = container.resolve(FindAllMathsService);

    const maths = await findAllMathsService.execute();

    const pages = getPaginatedData(req.query.page, req.query.pageSize, maths);

    return res.status(200).json(pages);
  }
}

export { FindAllMathsController };
