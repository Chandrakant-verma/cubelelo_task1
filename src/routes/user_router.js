import { Router } from "express";
import {createTicket,loginUser,registerUser} from "../controller/user_controller.js";

const userRouter = Router();

userRouter.post("/create_ticket",createTicket);

userRouter.get("/authentication",(req,res)=>{
  res.render("user_authentication");
})

userRouter.post("/login",loginUser);
userRouter.post("/register", registerUser);

export { userRouter};