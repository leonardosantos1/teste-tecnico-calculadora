import { inject, injectable } from "tsyringe";
import { IMathRepository } from "../../repositories/Math/IMathRepository";
import { MathForm } from "../../models/form/MathForm";

@injectable()
class InsertMathService {
  constructor(
    @inject("MathRepository") private mathRepository: IMathRepository
  ) {}

  async execute({user_id,calculation}:MathForm): Promise<object> {

    const result = eval(calculation).toString();

    await this.mathRepository.insert({user_id,calculation,result})

    return {calculation,result};

  }
}

export { InsertMathService };
