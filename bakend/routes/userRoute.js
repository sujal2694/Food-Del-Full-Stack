import express from "express"
import { loginUser, registerdUser } from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post("/register", registerdUser)
userRouter.post("/login",loginUser)

export default userRouter;
