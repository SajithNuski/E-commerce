import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../config/api";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .post(backendUrl + "/api/order/list", {}, { headers: { token } })
      .then((response) => setOrders(response.data.orders || []))
      .catch((error) => console.log(error));
  }, [token]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        const refreshedOrders = await axios.post(
          backendUrl + "/api/order/list",
          {},
          { headers: { token } },
        );
        setOrders(refreshedOrders.data.orders || []);
      } else {
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start gap-4">
              <img
                src={assets.parcel_icon}
                className="w-14 h-14 shrink-0"
              />
              <div className="flex-1">
                {/* Date */}
                <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">
                  {new Date(order.Date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                {/* Order Items Count and Products */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-700 mb-2">
                    Items Count:{" "}
                    <span className="text-blue-600">{order.items.length}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Products:
                  </p>
                  <div className="ml-4 space-y-1">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        • <span className="font-medium">{item.name}</span>{" "}
                        <span className="text-gray-500">
                          (Qty: {item.quantity}, Size: {item.size})
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* User & Contact Info */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Customer Information
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Name:</span>{" "}
                    {order.address.firstname} {order.address.lastname}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Phone:</span>{" "}
                    {order.address.phone}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Email:</span>{" "}
                    {order.address.email}
                  </p>
                </div>

                {/* Full Address */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Delivery Address
                  </p>
                  <p className="text-sm text-gray-700">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state} {order.address.zip},{" "}
                    {order.address.country}
                  </p>
                </div>

                {/* Order Status & Payment */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Order Details
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Status:</span>{" "}
                    <span className="text-orange-600 font-semibold">
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Payment Method:</span>{" "}
                    {order.paymentMethode}
                  </p>
                  <p className="text-lg text-gray-900 font-bold">
                    Amount:{" "}
                    <span className="text-green-600">
                      {currency}
                      {order.amount}
                    </span>
                  </p>
                </div>

                {/* Status Update */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-2">
                    Update Status
                  </label>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value={order.status}>{order.status}</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
