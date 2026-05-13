import UserModel from "../models/userModule.js";
import OrderModel from "../models/orderModel.js";

// COD methode

const placeOrder = async (req, res) => {
  try {
    const { userId, item, amount, address } = req.body;
    const orderData = {
      userId,
      items: item,
      amount,
      paymentMethode: "COD",
      payment: false,
      Date: Date.now(),
      address,
    };
    const order = new OrderModel(orderData);
    await order.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error placing order" });
    console.log(error);
  }
};

// strip methode
const placeOrderStripe = async (req, res) => {};

// razerpay methode
const placeOrderRazerpay = async (req, res) => {};

// All orders data for admin panel
const getAllOrders = async (req, res) => {};

// user order data for frontend
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await OrderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching user orders" });
    console.log(error);
  }
};

// update order status from admin panel
const updateOrderStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazerpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
