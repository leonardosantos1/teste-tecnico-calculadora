import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";
import cors from 'cors';
import "express-async-errors";
import "reflect-metadata";
import "./shared/container";
import { router } from "./routes";
import { ApplicationError } from "./error/ApplicationError";

const app = express();

app.use(cors({origin:"http://127.0.0.1:5500",credentials:true}));
app.use(cookieParser());
app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationError) {
  
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json({ status: "error", message: `Internal Server Error - ${err.message}` })
  })
  

const port = process.env.PORT || 3001

app.listen(port,()=>{console.log(`APPLICATION ON in the PORT: ${port}`)})
