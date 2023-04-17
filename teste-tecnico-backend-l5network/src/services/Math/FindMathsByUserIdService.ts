import { inject, injectable } from "tsyringe";
import { IMathRepository } from "../../repositories/Math/IMathRepository";
import { MathDtoDate } from "../../models/dto/MathDtoDate";

@injectable()
class FindMathsByUserIdService {
  constructor(
    @inject("MathRepository") private mathRepository: IMathRepository
  ) {}

  async execute(user_id:string): Promise<MathDtoDate[]> {

    const maths:MathDtoDate[] = await this.mathRepository.findByUserId(user_id);

    return maths;

  }
}

export { FindMathsByUserIdService };
