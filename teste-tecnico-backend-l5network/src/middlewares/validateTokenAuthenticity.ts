import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authenticateJwt";
import { ApplicationError } from "../error/ApplicationError";

export function validateTokenAuthenticity(req: Request, res: Response, next: NextFunction) {

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ "message": "Null Token! Please perform Login" });
        }
        if(!verifyToken(token)) throw new ApplicationError("Token invalid",401);
        next()
    } catch (err) {
        console.log(err);
        throw new ApplicationError(err, 401);
    }
}
