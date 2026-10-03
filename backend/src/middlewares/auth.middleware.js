import jwt from "jsonwebtoken";
import tokenBlcklistModel from "../models/blacklist.model.js";


async function authUser(req,res, next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message :"Token not provided"
        })
    }

    const istokenBlacklisted = await tokenBlcklistModel.findOne({ token })

    if(istokenBlacklisted){
        return res.status(401).json({
            message :"token is invalid"
        })
    }
    try{

        const decoded =  jwt.verify(token , process.env.JWT_SECRET);

        req.user = decoded

        next();
    }
    catch(err){
        return res.status.json({
            message :"Invalid token"
        })
    }
}

export default authUser;