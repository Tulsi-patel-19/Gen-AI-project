import usermodel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tokenBlcklistModel from "../models/blacklist.model.js";



/**
 *  @name registerUserController
 * @description register a new user ,require username and email and password. 
 * @access public
 */

async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "please provide username , email and password"
        })
    }

    const isUserAlreadyExists = await usermodel.findOne({
        // basically it a array return if , any one exist
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await usermodel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },

        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        token: token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController 
 * @description login a user with email and password
 * @access public
 */

async function loginUserController(req, res) {

    const { email, password } = req.body

    const user = await usermodel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const ispasswordvalid = await bcrypt.compare(password, user.password)

    if (!ispasswordvalid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token);

    res.status(200).json({
        message: "User Login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })



}

/**
 * @name logoutUserController
 * @description logout user , clear token from cookie and put in blcklisting
 * @access public
 */

async function logoutUserController(req, res) {

    const token = req.cookies.token;

    if (token) {
        await tokenBlcklistModel.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User Loggout Successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details 
 * @access private
 */
async function getMeController(req,res){
    const user = await usermodel.findById(req.user.id)

    res.status(200).json({
        message : "User details fetch successfully",
        user :{
            id :user._id,
            username : user.username,
            email : user.email
        }
    })
}

export {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
};