import React from "react";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // Try context token first, fall back to persisted token in localStorage
        const activeToken = token || localStorage.getItem("token");
        if (!activeToken) {
          setOrders([]);
          return;
        }
        const response = await axios.post(
          backendUrl + "/api/order/userorders",
          {},
          { headers: { token: activeToken } },
        );
        setOrders(response.data.orders || []);
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, [token, backendUrl]);

  const loadOrderData = (orderId) => {
    const o = orders.find((x) => x._id === orderId);
    if (!o) {
      toast.error("Order not found");
      return;
    }
    const msg = `Status: ${o.status}\nPayment: ${o.paymentMethode || (o.paymentId ? "Razorpay" : "COD")}\nAmount: ${o.amount}`;
    toast.info(msg, { autoClose: 6000 });
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title Text1={"YOUR"} Text2={"ORDERS"} />
      </div>

      <div>
        {orders.map((order, index) => {
          const prod = (order.items && order.items[0]) || {};
          const quantity = prod.quantity || 1;
          const date = order.Date
            ? new Date(order.Date).toLocaleDateString()
            : "-";
          const paymentLabel =
            order.paymentMethode || (order.paymentId ? "Razorpay" : "COD");

          return (
            <div
              key={index}
              className="flex flex-col border-t border-b text-gray-700 border-gray-300 md:flex-row md:items-center md:justify-between items-center gap-4 py-4 rounded"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={(prod.image && prod.image[0]) || ""}
                  alt={prod.name || ""}
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="sm:text-base font-medium ">{prod.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {prod.price || 0}.00
                    </p>
                    <p>Quantity:{quantity}</p>
                    <p>Size:{prod.size || "-"}</p>
                  </div>
                  <p className="mt-1">
                    Date: <span className="text-gray-400">{date}</span>
                  </p>
                  <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400">{paymentLabel}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500 "></p>
                  <p className="text-sm md:text-base"> {order.status}</p>
                </div>
                <button
                  onClick={() => loadOrderData(order._id)}
                  className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
