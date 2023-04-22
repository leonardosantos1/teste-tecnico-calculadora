import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindMathsByUserIdService } from "../../services/Math/FindMathsByUserIdService";
import { getPaginatedData } from "../../utils/pagination";

class FindMathsByUserIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findMathsByUserIdService = container.resolve(FindMathsByUserIdService);

    const {user_id} = req.params;
    const maths = await findMathsByUserIdService.execute(user_id);

    const pages = getPaginatedData(req.query.page, req.query.pageSize, maths)

    return res.status(200).json(pages);
  }
}

export { FindMathsByUserIdController };
