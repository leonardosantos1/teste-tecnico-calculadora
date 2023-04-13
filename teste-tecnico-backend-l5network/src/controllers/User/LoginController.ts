import { Request, Response } from "express";
import { LoginService } from "../../services/User/LoginService";
import { container } from "tsyringe";

class LoginController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const loginService = container.resolve(LoginService);

    const response = await loginService.execute(email, password);

    return res.status(200).json(response);
  }
}

export { LoginController };
