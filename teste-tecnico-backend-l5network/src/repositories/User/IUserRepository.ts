import { User } from "../../models/User";
import { UserDto } from "../../models/dto/UserDto";
import { UserForm } from "../../models/form/UserForm";


interface IUserRepository{

    insert(user:UserForm):Promise<void>;
    findAll():Promise<UserDto[]>;
    findById(id:string):Promise<UserDto>;
    findByEmail(email:string):Promise<User>

}


export {IUserRepository}