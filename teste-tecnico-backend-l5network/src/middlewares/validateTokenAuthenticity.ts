import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authenticateJwt";
import { ApplicationError } from "../error/ApplicationError";


export function validateTokenAuthenticity(req: Request, res: Response, next: NextFunction) {

    try {
        const token = req.cookies ? req.cookies.token : null; 
        if (!token) return res.status(401).json({"message":"Null Token! Please perform Login"});

        if(!verifyToken(token)) return res.status(401).json({"message":"Token invalid!"});

        next();
    } catch (err) {
        console.log(err);
        throw new ApplicationError(err,401);
    }
}
