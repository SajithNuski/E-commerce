import express from "express";

import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazerpay,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, getAllOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// payment method
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razerpay", authUser, placeOrderRazerpay);

// user features
orderRouter.post("/userorders", authUser, getUserOrders);

export default orderRouter;
