import { Router } from "express";
import { LoginController } from "../controllers/User/LoginController";
import { validateLoginSchema } from "../middlewares/validateLoginSchema";

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post("/",validateLoginSchema, loginController.handle);

export { loginRouter };
