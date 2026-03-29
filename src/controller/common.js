import { User } from "../model/user_model.js";
import { Manager } from "../model/manager_model.js";
import jwt from "jsonwebtoken";

const checkUser = async (req, res) => {
    try {
        const token = req.cookies?.accessToken;
        console.log(token);

        if (!token || typeof token !== "string") {
            return res.render("first_page");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);

        const user = await User.findById(decodedToken._id).select("-password");
        const manager = await Manager.findById(decodedToken._id).select("-password");

        if (user) {
            return res.render("user_dashboard", { email: user.email, name: user.name });
        } else if (manager) {
            return res.render("manager_dashboard", { email: manager.email, name: manager.name });
        } else {
            return res.render("first_page");
        }

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            console.log("Token expired");
            return res.render("first_page");
        }

        if (error.name === "JsonWebTokenError") {
            console.log("Invalid token");
            return res.render("first_page");
        }

        console.log(error);
        return res.render("first_page");
    }
};

export {checkUser};