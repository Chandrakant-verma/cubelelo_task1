import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import {userRouter} from "./src/routes/user_router.js";
import{ managerRouter} from "./src/routes/manager_router.js";
import { checkUser } from "./src/controller/common.js";

const app = express();
dotenv.config( {path:"./.env"} );
app.use(express.static("public"));

app.use(cors({  origin: process.env.CORS_ORIGIN,credentials : true  }))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/users",userRouter);
app.use("/managers",managerRouter);
app.use("/",checkUser);

const connectDB = async()=>{
       
    try{
         const connectionInstance = await mongoose.connect( `${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
         console.log(`mongoDB connected connection Host : ${connectionInstance.connection.host} `);
    }catch(error){
        console.log("monogoDB connection failed with error : ", error);
        process.exit(1);
    }
}

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
});