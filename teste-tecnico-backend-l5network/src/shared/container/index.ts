import {container} from "tsyringe";
import { IUserRepository } from "../../repositories/User/IUserRepository";
import { UserRepository } from "../../repositories/User/UserRepository";
import { IMathRepository } from "../../repositories/Math/IMathRepository";
import { MathRepository } from "../../repositories/Math/MathRepository";

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
)

container.registerSingleton<IMathRepository>(
    "MathRepository",
    MathRepository
)
