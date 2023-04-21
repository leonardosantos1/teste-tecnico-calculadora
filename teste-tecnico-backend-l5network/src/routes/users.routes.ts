import { Router } from "express";
import { FindAllUsersController } from "../controllers/User/FindAllUsersController";

const usersRouter = Router();
const findAllUsersController = new FindAllUsersController();

usersRouter.get("/", findAllUsersController.handle);
usersRouter.get("/:id", findAllUsersController.handle);


export { usersRouter };
