import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    cartItems,
    products,
    navigate,
    token,
    backendUrl,
    setCartItems,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      // console.log(orderItems);
      let orderData = {
        address: formData,
        item: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // api call for cod order
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token: token } },
          );
          console.log(response.data)
          if (response.data.success) {
            setCartItems({});
            navigate("/order");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title Text1={"DELIVERY"} Text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={handleChange}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={handleChange}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={handleChange}
          name="email"
          value={formData.email}
          className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={handleChange}
          name="street"
          value={formData.street}
          className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
          type="text"
          placeholder="Street Address"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={handleChange}
            name="city"
            value={formData.city}
            className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={handleChange}
            name="state"
            value={formData.state}
            className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={handleChange}
            name="zip"
            value={formData.zip}
            className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
            type="number"
            placeholder="Zip Code"
            min={1}
          />
          <input
            required
            onChange={handleChange}
            name="country"
            value={formData.country}
            className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={handleChange}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 w-full px-3 py-2 text-gray-600 rounded"
          type="number"
          placeholder="Phone Number"
        />
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title Text1={"PAYMENT"} Text2={"METHOD"} />
          {/* payment options */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("Stripe")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "Stripe" ? "bg-green-500" : ""}`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.stripe_logo}
                alt="check_icon"
              />
            </div>
            <div
              onClick={() => setMethod("Razorpay")}
              className="flex items-center gap-3 border  border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "Razorpay" ? "bg-green-500" : ""}`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="check_icon"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-500" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-purple-600 text-white py-3 px-17 rounded text-sm hover:bg-purple-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
