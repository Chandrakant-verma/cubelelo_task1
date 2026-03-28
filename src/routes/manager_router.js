import { Router } from "express";

const managerRouter = Router();

managerRouter.get("/dashboard",(req, res)=>{
  res.render("manager_dashboard");
})

export  {managerRouter};