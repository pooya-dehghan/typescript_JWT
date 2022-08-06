import dotenv from 'dotenv';
import express from 'express';
import process from 'process';
import authRouter from './router/auth'
dotenv.config();

const app = express();


app.use(express.json());
app.use('/auth',authRouter);

const start = (port : number) => {
  try{
    app.listen(port,  () => {
      console.log("port is: ",port);
    })
  }catch(err){
    console.error(err);
  }
}
start(5000)