import { Router } from "express";
import { LoginController } from "../controllers/User/LoginController";

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post("/", loginController.handle);

export { loginRouter };
