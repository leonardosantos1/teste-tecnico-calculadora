import { MathDto } from "../../models/dto/MathDto";
import { Math } from "../../models/Math";


interface IMathRepository{

    insert(user:MathDto):Promise<void>;
    findAll():Promise<Math[]>;
    findById(id:string):Promise<MathDto>;
    findByUserId(user_id:string):Promise<MathDto[]>

}


export {IMathRepository}