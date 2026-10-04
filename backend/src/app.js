import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5317",
    credentials:true
}))

/* using all the routes here */
app.use("/api/auth",authRouter)

export default app;