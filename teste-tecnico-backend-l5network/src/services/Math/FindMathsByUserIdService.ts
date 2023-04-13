import { inject, injectable } from "tsyringe";
import { IMathRepository } from "../../repositories/Math/IMathRepository";
import { MathDto } from "../../models/dto/MathDto";

@injectable()
class FindMathsByUserIdService {
  constructor(
    @inject("MathRepository") private mathRepository: IMathRepository
  ) {}

  async execute(user_id:string): Promise<MathDto[]> {

    const maths:MathDto[] = await this.mathRepository.findByUserId(user_id);

    return maths;

  }
}

export { FindMathsByUserIdService };
