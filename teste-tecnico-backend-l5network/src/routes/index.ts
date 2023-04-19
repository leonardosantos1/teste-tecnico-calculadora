import { Router } from "express";
import { loginRouter } from "./login.routes";
import { signupRouter } from "./signup.routes";
import { usersRouter } from "./users.routes";
import { mathsRouter } from "./maths.routes";
import { logoutRouter } from "./logout.routes";

const router = Router();

router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/users", usersRouter);
router.use("/maths",mathsRouter);
router.use("/logout",logoutRouter);

export { router };
