import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./database.js";
import crypto from 'crypto'
import jwt from "jsonwebtoken";

import LinkRouter from './Routers/linkRouter.js';
import UserRouter from './Routers/userRouter.js';

connectDB();
const app = express()

app.use(express.json());


app.use(cors());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON request');
      return res.status(400).send({ error: 'Bad JSON request' }); // Bad request
    }
    next();
  });
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hello World!');
})
app.use('/',  LinkRouter);
app.use('/users',  UserRouter);

app.listen(port,()=>{
    console.log(`Example app listening on http://localhost:${port}`);
})
