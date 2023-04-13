import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/User/IUserRepository";
import { UserDto } from "../../models/dto/UserDto";

@injectable()
class FindAllUsersService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(): Promise<UserDto[]> {
    const users: UserDto[] = await this.userRepository.findAll();
    return users;
  }
}

export { FindAllUsersService };
