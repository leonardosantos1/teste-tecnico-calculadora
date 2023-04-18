import { Router } from "express";
import { SignUpController } from "../controllers/User/SignUpController";
import { validateSignUpSchema } from "../middlewares/validateSignUpSchema";

const signupRouter = Router();
const signUpController = new SignUpController();

signupRouter.post("/", validateSignUpSchema, signUpController.handle);


export {signupRouter}