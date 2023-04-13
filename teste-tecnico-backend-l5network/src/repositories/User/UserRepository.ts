import { knex } from "../../config/database";
import { v4 as uuidV4 } from "uuid";
import { UserDto } from "../../models/dto/UserDto";
import { UserForm } from "../../models/form/UserForm";
import { IUserRepository } from "./IUserRepository";
import { User } from "../../models/User";

class UserRepository implements IUserRepository {
  async insert({ name, email, password }: UserForm): Promise<void> {

    try {
      await knex("users").insert({ id: uuidV4(), name, email, password });
    } catch (err) {
      console.log(err);
      throw new Error(
        "Something Wrong Happened in /src/repositories/UserRepository method - insert"
      );
    }
  }
  async findAll(): Promise<UserDto[]> {
    try {
      const users: UserDto[] = await knex("users").select(
        "id",
        "name",
        "email"
      );

      return users;

    } catch (err) {
      console.log(err);
      throw new Error(
        "Something Wrong Happened in /src/repositories/UserRepository method - findAll"
      );
    }
  }
  async findById(id: string): Promise<UserDto> {
    try {
      const user: UserDto = await knex("users")
        .where({ id })
        .first("id", "name", "email");

      return user;
    } catch (err) {
      console.log(err);
      throw new Error(
        "Something Wrong Happened in /src/repositories/UserRepository method - findById"
      );
    }
  }

  async findByEmail(
    email: string,
  ): Promise<User> {
    try{

        const user = await knex("users").where({email}).first();
        return user;

    }catch(err){
        console.log(err);
        throw new Error(
            "Something Wrong Happened in /src/repositories/UserRepository method - findByEmail"
          );
    }
  }
}

export { UserRepository };
