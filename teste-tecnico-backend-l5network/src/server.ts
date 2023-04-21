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
app.use(cookieParser());

app.use(cors({
  origin: "http://127.0.0.1:5500", credentials: true
}));

app.use(express.json());

app.use(router);


// app.post('/set-cookie', async (req: Request, res: Response) => {

//   try {
//     const token = await generateToken({ id: req.body.user_id });

//     res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
//     res.send('Cookie set successfully');
//   } catch (err) {

//     console.log(err);
//     res.status(401).send();
//   }
// });

// app.get('/get-cookie', (req: Request, res: Response) => {
//   const token = req.cookies.token;
//   if (token) {
//     res.send(`Token: ${token}`);
//   } else {
//     res.send('Cookie not found');
//   }
// });

// app.get('/clear-cookie', (req: Request, res: Response) => {
//   res.clearCookie('token', { httpOnly: true });
//   return res.send("clear token");
// });



app.use((err: Error, request: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApplicationError) {

    return res.status(err.statusCode).json({ message: err.message })
  }
  return res.status(500).json({ status: "error", message: `Internal Server Error - ${err.message}` })
})


const port = process.env.PORT || 3001

app.listen(port, () => { console.log(`APPLICATION ON in the PORT: ${port}`) })
