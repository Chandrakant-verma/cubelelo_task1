import { Router } from "express";
import { getList,seeUresolved, pattern, summary } from "../controller/manager_controller.js";
const managerRouter = Router();

managerRouter.get("/dashboard",(req, res)=>{
  res.render("manager_dashboard");
})

managerRouter.get("/getList",getList);
managerRouter.get("/unresolved",seeUresolved);
managerRouter.get("/pattern",pattern);
managerRouter.get("/summary",summary);
export  {managerRouter};