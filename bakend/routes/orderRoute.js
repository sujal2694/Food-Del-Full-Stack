import express from "express"
import authMiddleware from "../middleware/nameAuth.js"
import { listorders, placeOrder, updateStatus, userorders, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userorders);
orderRouter.get("/list",listorders)
orderRouter.post("/status",updateStatus)

export default orderRouter;