import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/User/IUserRepository";
import { UserDto } from "../../models/dto/UserDto";

@injectable()
class FindUserByIdService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(id:string): Promise<UserDto> {
    const users: UserDto = await this.userRepository.findById(id);
    return users;
  }
}

export { FindUserByIdService };
