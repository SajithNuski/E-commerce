import React from "react";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ productId, category, subCategory }) => {
  const { products } = useContext(ShopContext);

  const normalize = (value) => value?.toString().trim().toLowerCase();

  const relatedProducts = products.filter(
    (item) =>
      item._id !== productId &&
      normalize(item.category) === normalize(category) &&
      normalize(item.subCategory) === normalize(subCategory),
  );

  const fallbackProducts =
    relatedProducts.length > 0
      ? relatedProducts
      : products.filter(
          (item) =>
            item._id !== productId &&
            normalize(item.category) === normalize(category),
        );

  const displayProducts =
    fallbackProducts.length > 0
      ? fallbackProducts.slice(0, 5)
      : products.filter((item) => item._id !== productId).slice(0, 5);

  return (
    <div className="mt-16">
      <div className="text-center text-3xl py-2">
        <Title Text1={"Related"} Text2={"Products"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {displayProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
