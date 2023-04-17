import { MathDto } from "../../models/dto/MathDto";
import { MathDtoDate } from "../../models/dto/MathDtoDate";
import { Math } from "../../models/Math";


interface IMathRepository{

    insert(user:MathDto):Promise<void>;
    findAll():Promise<Math[]>;
    findById(id:string):Promise<MathDto>;
    findByUserId(user_id:string):Promise<MathDtoDate[]>

}


export {IMathRepository}