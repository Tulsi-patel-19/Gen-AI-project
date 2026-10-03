import express from "express";
import {registerUserController , loginUserController ,logoutUserController , getMeController} from "../controllers/auth.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

/**
 * @route POST  /api/auth/register
 * @description Register new user
 * @access public
 */

authRouter.post("/register",registerUserController);

/**
 * @route POST /api/auth/login
 * @description login with email and password
 * @access public
 */

authRouter.post("/login",loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */

authRouter.get("/logout",logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current login in use details
 * @access private
 */

authRouter.get("/get-me",authUser,getMeController);

export default authRouter;