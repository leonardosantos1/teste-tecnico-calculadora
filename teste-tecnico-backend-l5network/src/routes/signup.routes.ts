import { Router } from "express";
import { SignUpController } from "../controllers/User/SignUpController";


const signupRouter = Router();
const signUpController = new SignUpController();


signupRouter.post("/", signUpController.handle);


export {signupRouter}