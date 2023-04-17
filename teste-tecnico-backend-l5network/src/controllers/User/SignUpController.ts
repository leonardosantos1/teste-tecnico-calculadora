import { Request, Response } from "express";
import { container } from "tsyringe";
import { SignUpService } from "../../services/User/SignUpService";
import { ApplicationError } from "../../error/ApplicationError";

class SignUpController {
  async handle(req: Request, res: Response): Promise<Response> {
    
      try{
        const { name, email, password } = req.body;

        const signUpService = container.resolve(SignUpService);
    
        await signUpService.execute({ name, email, password });
    
        return res.status(201).send();
      }catch(err){
        console.log(err);
        throw new ApplicationError(err, 400);
      }

    
  }
}

export { SignUpController };
