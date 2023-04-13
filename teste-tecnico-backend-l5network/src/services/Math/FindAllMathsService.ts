import { inject, injectable } from "tsyringe";
import { IMathRepository } from "../../repositories/Math/IMathRepository";
import { Math } from "../../models/Math";

@injectable()
class FindAllMathsService {
  constructor(
    @inject("MathRepository") private mathRepository: IMathRepository
  ) {}

  async execute(): Promise<Math[]> {

    const maths:Math[] = await this.mathRepository.findAll();

    return maths;

  }
}

export { FindAllMathsService };
