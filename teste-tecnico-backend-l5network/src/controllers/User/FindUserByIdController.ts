import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserByIdService } from "../../services/User/FindUserByIdService";

class FindUserByIdController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;

        const findUserByIdService = container.resolve(FindUserByIdService);

        const user = await findUserByIdService.execute(id);

        return res.status(200).json(user);
    }
}

export { FindUserByIdController };
