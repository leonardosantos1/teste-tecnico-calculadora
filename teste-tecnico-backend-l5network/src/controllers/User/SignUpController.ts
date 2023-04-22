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
        throw new ApplicationError("Por favor verifique os campos de Nomen Email e Senha para ver se são validos. Email só podem ser cadastrados somente uma vez!", 400);
      }

    
  }
}

export { SignUpController };
