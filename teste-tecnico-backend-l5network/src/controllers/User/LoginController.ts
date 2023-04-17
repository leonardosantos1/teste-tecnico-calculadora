import { Request, Response } from "express";
import { LoginService } from "../../services/User/LoginService";
import { container } from "tsyringe";
import { ApplicationError } from "../../error/ApplicationError";

class LoginController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const loginService = container.resolve(LoginService);

      const response = await loginService.execute(email, password);

      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      throw new ApplicationError(err, 400);
    }
  }
}

export { LoginController };
