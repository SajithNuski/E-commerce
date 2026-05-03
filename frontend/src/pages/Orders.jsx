import React from "react";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title Text1={"YOUR"} Text2={"ORDERS"} />
      </div>
      <div>
        {products.slice(1, 4).map((prod, index) => (
          <div
            key={index}
            className="flex flex-col border-t border-b text-gray-700 border-gray-300 md:flex-row md:items-center md:justify-between items-center gap-4 py-4 rounded"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={prod.image[0]}
                alt={prod.name}
                className="w-16 sm:w-20"
              />
              <div>
                <p className="sm:text-base font-medium ">{prod.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {prod.price}.00
                  </p>
                  <p>Quantity:1</p>
                  <p>Size:M</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">2026-04-30</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500 "></p>
                <p className="text-sm md:text-base"> Ready to Ship</p>
              </div>
              <button className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
