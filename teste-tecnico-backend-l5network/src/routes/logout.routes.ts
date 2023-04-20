import { Router, Request, Response } from "express";
import { ApplicationError } from "../error/ApplicationError";

const logoutRouter = Router();

logoutRouter.get("/", (req: Request, res: Response) => {
    try {

        res.clearCookie('token', { httpOnly: true });
        return res.status(200).send();

    } catch (err) {
        console.log(err);
        throw new ApplicationError(err, 500);
    }
})

export {logoutRouter}