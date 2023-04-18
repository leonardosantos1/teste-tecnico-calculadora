import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/User/IUserRepository";
import { User } from "../../models/User";
import { comparePassword } from "../../utils/passwordUseCases";
import { generateToken } from "../../utils/authenticateJwt";
import { ApplicationError } from "../../error/ApplicationError";

interface IResponseLoginService{

  token:string;
  name:string;
  user_id:string;
}

@injectable()
class LoginService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(email: string, password: string): Promise<IResponseLoginService> {
    
    const user: User = await this.userRepository.findByEmail(email);

    const isPasswordMatch = comparePassword(password, user.password);

    if (!isPasswordMatch)
      throw new ApplicationError(
        "Something Wrong Happened in /src/services/LoginService - password not match",400
      );

    const token = generateToken({id:user.id});

    const response:IResponseLoginService = { token, name: user.name , user_id:user.id };

    return response;
  }
}

export { LoginService,IResponseLoginService };
