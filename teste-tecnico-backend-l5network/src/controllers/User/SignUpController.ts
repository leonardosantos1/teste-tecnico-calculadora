import { Request, Response } from "express";
import { container } from "tsyringe";
import { SignUpService } from "../../services/User/SignUpService";

class SignUpController {
  async handle(req: Request, res: Response): Promise<Response> {
    
    const { name, email, password } = req.body;

    const signUpService = container.resolve(SignUpService);

    await signUpService.execute({ name, email, password });

    return res.status(201).send();
  }
}

export { SignUpController };
