import { Ticket } from "../model/tickets_model.js";
import { User } from "../model/user_model.js";
import bcrypt from "bcryptjs";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        console.log("error while generating access and refresh token: ", error);
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('both email and password required');
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        console.log("user not found");
        return res.render("user_authentication");
    }



    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        console.log('incorrect password');
        return res.render("user_authentication");
    }

    const token = await generateAccessAndRefereshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax"
    };

    res.cookie("accessToken", token.accessToken, options);

    res.render('user_dashboard', { email: email, name: user.name});

}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.render("user_authentication");
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (!user) {
            return res.render("user_authentication");
        }

        console.log('user created successfully');

        res.render('user_dashboard');

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};

const createTicket = async(req,res)=>{
    
     const { customername,productname, issue, category, status, priority  } = req.body;
     const ticket = await Ticket.create({
             customername : customername,
             productname  : productname,
             issue : issue,
             category: category,
             status: status,
             priority: priority
     })

     if( !ticket){
      console.log("failed to create ticket");
      return;
     }
     
     console.log("successfully created ticket:",ticket);
     res.render("first_page");
}

export { createTicket, loginUser, registerUser};