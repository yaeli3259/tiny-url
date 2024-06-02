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
app.use(bodyParser.json());
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hello World!');
})
app.use('/links',  LinkRouter);
app.use('/users',  UserRouter);

app.listen(port,()=>{
    console.log(`Example app listening on http://localhost:${port}`);
})



// const logMiddleware=(req,res,next)=>{
//   // req.UUID=crypto.randomUUID();
//   // console.log(`request ${req.UUID} started. `);
//   // next();
// };
// const secret = "HGK1crsv3/2%80DHNHHK61";
// const token = jwt.sign(  { id: 1, name: "task 1", isComplete: true  },secret);
