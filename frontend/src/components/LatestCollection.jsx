import React from "react";
import { products } from "../assets/assets";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const latestProducts = products.slice(0, 10);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl ">
        <Title Text1="LATEST" Text2="COLLECTION" />
        <p className="w-3/4 m-auto text-x5 sm:text-sm md:text-base text-gray-500">
          Explore our latest collection of fashion and accessories, featuring
          the newest trends and styles.{" "}
        </p>
      </div>
      {/* Rendering latest products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
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

export default LatestCollection;
