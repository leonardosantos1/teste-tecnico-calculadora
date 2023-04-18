import { Request, Response } from "express";
import { IResponseLoginService, LoginService } from "../../services/User/LoginService";
import { container } from "tsyringe";
import { ApplicationError } from "../../error/ApplicationError";

class LoginController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const loginService = container.resolve(LoginService);

      const response:IResponseLoginService = await loginService.execute(email, password);

      res.cookie("token", response.token, { maxAge:3600000,httpOnly: true,secure:false })

      return res.status(200).json({"name":response.name, "user_id":response.user_id});
    } catch (err) {
      console.log(err);
      throw new ApplicationError(err, 400);
    }
  }
}

export { LoginController };
