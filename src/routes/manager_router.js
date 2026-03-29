import { Router } from "express";
import { getList,seeUresolved, pattern, summary, loginManager, registerManager } from "../controller/manager_controller.js";
const managerRouter = Router();

managerRouter.get("/authentication",(req, res)=>{
   res.render("manager_authentication");
})

managerRouter.post("/login",loginManager);
managerRouter.post("/register",registerManager);
managerRouter.get("/getList",getList);
managerRouter.get("/unresolved",seeUresolved);
managerRouter.get("/pattern",pattern);
managerRouter.get("/summary",summary);
export  {managerRouter};