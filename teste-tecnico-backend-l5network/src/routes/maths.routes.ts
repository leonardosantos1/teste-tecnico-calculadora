import { Router } from "express";
import { InsertMathController } from "../controllers/Math/InsertMathController";
import { FindMathsByUserIdController } from "../controllers/Math/FindMathsByUserIdController";
import { validateMathSchema } from "../middlewares/validateMathSchema";
import { validateParamMathUserId } from "../middlewares/validateParamMathUserId";
import { FindAllMathsController } from "../controllers/Math/FindAllMathsController";
import { validateTokenAuthenticity } from "../middlewares/validateTokenAuthenticity";

const mathsRouter = Router();

const insertMathController = new InsertMathController();
const findMathsByUserIdController = new FindMathsByUserIdController();
const findAllMathsController = new FindAllMathsController();

mathsRouter.post("/",validateTokenAuthenticity,validateMathSchema,insertMathController.handle);
mathsRouter.get("/user/:user_id",validateParamMathUserId,findMathsByUserIdController.handle);
mathsRouter.get("/",validateTokenAuthenticity,findAllMathsController.handle);

export { mathsRouter };
