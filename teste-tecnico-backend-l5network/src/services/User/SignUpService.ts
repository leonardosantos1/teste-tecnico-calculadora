import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/User/IUserRepository";
import { UserForm } from "../../models/form/UserForm";
import { generatePasswordHash } from "../../utils/passwordUseCases";

@injectable()
class SignUpService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: UserForm): Promise<void> {
   
    const passwordHash = await generatePasswordHash(password);
    await this.userRepository.insert({ name, email, password:passwordHash});

}
}

export { SignUpService };
