import React from "react";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate } =
    useContext(ShopContext);

  const cartData = [];
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      if (cartItems[productId][size] > 0) {
        cartData.push({
          _id: productId,
          size,
          quantity: cartItems[productId][size],
        });
      }
    }
  }

  return (
    <div className="border-t pt-14">
      <div className=" text-2xl mb-3">
        <Title Text1={"Your"} Text2={"Cart"} />
      </div>

      <div className="">
        {cartData.map((item, index) => {
          const productData = products.find((prod) => prod._id === item._id);

          if (!productData) {
            return null;
          }

          return (
            <div
              key={index}
              className="py-4 border-b border-t border-gray-300 text-gray-600 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className="w-24 sm:w-20"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium ">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price.toFixed(2)}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-gray-100 text-purple-700 ">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-purple-700 border-gray-300 rounded"
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) => e.target.value === "" || e.target.value === 0 ? null : updateQuantity(item._id, item.size, parseInt(e.target.value))}
              />
              <img
                src={assets.bin_icon}
                alt="Remove"
                className="w-4 mr-4 sm:w-5  cursor-pointer"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end" >
            <button 
              className="mt-5 px-5 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              onClick={() => navigate("/place-order")}
            >
              PROCEDD TO CHECKOUT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
