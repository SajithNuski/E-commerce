import UserModel from "../models/userModule.js";
import OrderModel from "../models/orderModel.js";
import Stripe from "stripe";

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

// COD method
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

/*
Stripe flow implemented here supports two actions:
*/
const placeOrderStripe = async (req, res) => {
  try {
    const { create, amount, paymentIntentId, userId, item, address } = req.body;

    if (create) {
      if (!amount)
        return res
          .status(400)
          .json({ success: false, message: "Amount required" });
      // amount expected in main currency units (e.g., 110 -> 110.00)
      const amountInCents = Math.round(amount * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: process.env.STRIPE_CURRENCY || "usd",
        payment_method_types: ["card"],
      });

      return res.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    }

    // Confirm and save order after payment
    if (!paymentIntentId)
      return res
        .status(400)
        .json({ success: false, message: "paymentIntentId required" });

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!intent)
      return res
        .status(404)
        .json({ success: false, message: "PaymentIntent not found" });

    if (intent.status !== "succeeded") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not completed" });
    }

    // Create order record
    const orderData = {
      userId,
      items: item,
      amount,
      paymentMethode: "Stripe",
      payment: true,
      paymentId: intent.id,
      paymentDetails: intent,
      Date: Date.now(),
      address,
    };

    const order = new OrderModel(orderData);
    await order.save();
    if (userId) await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({
      success: true,
      message: "Order placed (Stripe)",
      orderId: order._id,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Stripe payment error" });
  }
};

// razerpay methode (placeholder - implement similarly)
const placeOrderRazerpay = async (req, res) => {
  try {
    // Implementation would mirror Stripe: create order/payment and confirm
    res
      .status(501)
      .json({ success: false, message: "Razorpay not implemented" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Razorpay error" });
  }
};

// All orders data for admin panel
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

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
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status)
      return res
        .status(400)
        .json({ success: false, message: "orderId and status required" });
    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazerpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
