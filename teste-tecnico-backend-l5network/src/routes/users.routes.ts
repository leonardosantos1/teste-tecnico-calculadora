import { Router } from "express";
import { FindAllUsersController } from "../controllers/User/FindAllUsersController";
import { FindUserByIdController } from "../controllers/User/FindUserByIdController";
import { validateParamUserId } from "../middlewares/validateParamUserId";
import { validateTokenAuthenticity } from "../middlewares/validateTokenAuthenticity";

const usersRouter = Router();
const findAllUsersController = new FindAllUsersController();
const findUserByIdController = new FindUserByIdController();

usersRouter.get("/user/:id", validateParamUserId, validateTokenAuthenticity, findUserByIdController.handle);
usersRouter.get("/", findAllUsersController.handle);


export { usersRouter };
