import React from "react";
import { products } from "../assets/assets";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const bestSellers = products
    .filter((item) => item.bestseller)
    .slice(0, 5);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title Text1="OUR" Text2="BESTSELLERS" />
        <p className="w-3/4 m-auto text-x5 sm:text-sm md:text-base text-gray-500">
          Explore our best-selling products, loved by customers for their
          quality and style. Shop now to experience the best of fashion and
          accessories.
        </p>
      </div>
      {/* Rendering best sellers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
