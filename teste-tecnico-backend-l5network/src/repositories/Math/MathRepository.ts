import { knex } from "../../config/database";
import { MathDto } from "../../models/dto/MathDto";
import { IMathRepository } from "./IMathRepository";
import {Math} from "../../models/Math"
import { v4 as uuidV4 } from "uuid";
import { MathDtoDate } from "../../models/dto/MathDtoDate";
import moment from 'moment-timezone';

const now = moment().tz('America/Sao_Paulo').toDate();


class MathRepository implements IMathRepository {
  async insert({ user_id, calculation, result }: MathDto): Promise<void> {
    try {
      await knex("maths").insert({
        id: uuidV4(),
        user_id,
        calculation,
        result,
        date:now
      });
    } catch (err) {
      console.log(err);
      throw new Error(
        "Something Wrong Happened in /src/repositories/MathRepository method - insert"
      );
    }
  }

  async findAll(): Promise<Math[]> {
    try {
      const maths: Math[]  = await knex("maths").select("*").orderBy("date","desc");

      return maths;

    } catch (err) {
      console.log(err);
      throw new Error(
        "Something Wrong Happened in /src/repositories/MathRepository method - findAll"
      );
    }
  }
  async findById(id: string): Promise<MathDto> {
    try {

      const math = await knex("maths").where({ id }).first();

      return math;

    } catch (err) {
      console.log(err);
      throw new Error(
        "Something Wrong Happened in /src/repositories/MathRepository method - findById"
      );
    }
  }
  async findByUserId(user_id: string): Promise<MathDtoDate[]> {
    try {
      const maths: MathDtoDate[] = await knex("maths")
        .where({ user_id })
        .select("user_id", "calculation", "result", "date").orderBy("date","desc");

      return maths;
      
    } catch (err) {
      console.log(err);
      throw new Error(
        "Something Wrong Happened in /src/repositories/MathRepository method - findByUserId"
      );
    }
  }
}

export { MathRepository };
