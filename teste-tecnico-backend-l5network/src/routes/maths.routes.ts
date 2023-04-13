import { Router } from "express";
import { InsertMathController } from "../controllers/Math/InsertMathController";
import { FindMathsByUserIdController } from "../controllers/Math/FindMathsByUserIdController";
import { validateMathSchema } from "../middlewares/validateMathSchema";
import { validateParamUserId } from "../middlewares/validateParamUserId";
import { FindAllMathsController } from "../controllers/Math/FindAllMathsController";

const mathsRouter = Router();

const insertMathController = new InsertMathController();
const findMathsByUserIdController = new FindMathsByUserIdController();
const findAllMathsController = new FindAllMathsController();

mathsRouter.post("/",validateMathSchema,insertMathController.handle);
mathsRouter.get("/user/:user_id",validateParamUserId,findMathsByUserIdController.handle);
mathsRouter.get("/",findAllMathsController.handle);


export { mathsRouter };
