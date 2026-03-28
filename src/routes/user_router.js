import { Router } from "express";
import {createTicket} from "../controller/user_controller.js";

const userRouter = Router();

userRouter.get("/dashboard",(req,res)=>{
  res.render("user_dashboard");
})

userRouter.post("/create_ticket",createTicket);

export { userRouter};