import { Ticket } from "../model/tickets_model.js";
import { Manager } from "../model/manager_model.js";
import bcrypt from "bcryptjs";

const generateAccessAndRefereshTokens = async (managerId) => {
    try {
        const manager = await Manager.findById(managerId)
        const accessToken = manager.generateAccessToken()
        const refreshToken = manager.generateRefreshToken()

        manager.refreshToken = refreshToken
        await manager.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        console.log("error while generating access and refresh token: ", error);
    }
}

const loginManager = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('both email and password required');
        return res.status(400).json({ message: "All fields are required" });
    }

    const manager = await Manager.findOne({ email: email });
    if (!manager) {
        console.log("manager not found");
        return res.render("manager_authentication");
    }



    const isPasswordCorrect = await bcrypt.compare(password, manager.password);
    if (!isPasswordCorrect) {
        console.log('incorrect password');
        return res.render("user_authentication");
    }

    const token = await generateAccessAndRefereshTokens(manager._id);

    const options = {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax"
    };

    res.cookie("accessToken", token.accessToken, options);

    res.render('manager_dashboard', { email: email, name: manager.name});

}

const registerManager = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const ManagerExists = await Manager.findOne({ email });
        if (ManagerExists) {
            console.log('Manager exists')
            return res.render("manager_authenctication");
        }

        const manager = await Manager.create({
            name,
            email,
            password
        });

        if (!manager) {
            return res.render("manager_authentication");
        }

        console.log('manager created successfully');

        res.render('manager_dashboard');

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};
const getList = async(req, res)=> {
    
     const list = await Ticket.find();
     
     res.render("getList",{list: list});
}

const seeUresolved = async (req, res) => {
  try {
    const list = await Ticket.find({ status: "open" });

    if (list.length === 0) {
      console.log("No unresolved tickets found");
    }

    res.render("seeunresolved", { list: list });

  } catch (error) {
    console.error("Error in seeUresolved:", error);
    res.status(500).send("Internal Server Error");
  }
};

const pattern = async(req, res) => {

     const list = await Ticket.find();

     res.render("pattern",{list: list});
}

const summary = async(req, res) => {

     const list = await Ticket.find();

     res.render("summary",{list : list});
}

export {getList, seeUresolved, pattern, summary, registerManager, loginManager};