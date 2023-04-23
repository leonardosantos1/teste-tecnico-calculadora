import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import * as path from "path";
import * as yaml from 'js-yaml'; 
import { Request, Response, NextFunction } from "express";
import cors from 'cors';
import "express-async-errors";
import "reflect-metadata";
import "./shared/container";
import { router } from "./routes";
import { ApplicationError } from "./error/ApplicationError";

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: (process.env.CORS_ORIGIN || "http://127.0.0.1:5500"), credentials: true
}));

app.use(express.json());

const swaggerFilePath =  path.join(__dirname, 'swagger.yml');
const swaggerFileContents = fs.readFileSync(swaggerFilePath, 'utf8');
const swaggerDocument = yaml.load(swaggerFileContents);

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(router);

app.use((err: Error, request: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApplicationError) {

    return res.status(err.statusCode).json({ message: err.message })
  }
  return res.status(500).json({ status: "error", message: `Internal Server Error - ${err.message}` })
})


const port = process.env.PORT || 3001

app.listen(port, () => { console.log(`APPLICATION ON in the PORT: ${port}`) })
