import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
// import { Products } from "../assets/assets";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const productData = products.find((item) => item._id === productId);
  const [image, setImage] = useState(productData?.image?.[0] || "");
  const [size, setSize] = useState("");

  return productData ? (
    <div className="border-t border-gray-200 pt-10 transition-opacity duration-500 opacity-100">
      {/* product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product Image */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={productData.name}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="Selected" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl mt-2 font-medium">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_icon} alt="" className="w-3 h-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3 h-3" />
            <p className=" pl-2 text-gray-600 ">(127)</p>
          </div>
          <p className="text-3xl text-gray-600">
            {currency}
            {productData.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mt-4">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`text-purple-800 font-medium bg-gray-100 px-4 py-2 rounded-md text-sm ${size === item ? "border-2 border-purple-700" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => addToCart(productId, size)}
            className="bg-purple-800 text-sm text-white px-8 py-3 rounded-md active:bg-purple-500"
          >
            ADD TO CART
          </button>
          <hr className="my-4 opacity-40 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy returns and exchanges policy with 7-days.</p>
          </div>
        </div>
      </div>

      {/* description and reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border  px-5 py-3 text-sm">Description</b>
          <p className="border  px-5 py-3 text-sm">Reviews(127)</p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500">
          <p>
            {/* write description here */}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            in quasi itaque, eius doloribus, illum accusantium laudantium ullam
            deserunt amet eum cupiditate suscipit voluptatum dolor!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            tenetur eligendi excepturi esse illo. Libero.
          </p>
        </div>
      </div>
      {/* display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
