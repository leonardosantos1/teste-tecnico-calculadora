import { Request, Response } from "express";
import { FindAllUsersService } from "../../services/User/FindAllUsersService";
import { container } from "tsyringe";

class FindAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllUsersService = container.resolve(FindAllUsersService);

    const users = await findAllUsersService.execute();

    return res.status(200).json(users);
  }
}

export { FindAllUsersController };
