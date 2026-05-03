import React from "react";
import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [ShowProducts, setShowProducts] = useState(true);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const computeDisplayProducts = () => {
    let productsCopy = products.slice();

    if (showSearch && search.trim() !== "") {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    if (sortType === "price_low_high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "price_high_low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    return productsCopy;
  };

  const displayProducts = computeDisplayProducts();

  const togleCategory = (e) => {
    const value = e.target.value;
    const nextCategory = category.includes(value)
      ? category.filter((item) => item !== value)
      : [...category, value];

    setCategory(nextCategory);
  };

  const subTogleCategory = (e) => {
    const value = e.target.value;
    const nextSubCategory = subCategory.includes(value)
      ? subCategory.filter((item) => item !== value)
      : [...subCategory, value];

    setSubCategory(nextSubCategory);
  };

  const handleSortChange = (e) => {
    const nextSortType = e.target.value;
    setSortType(nextSortType);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60 ">
        <p
          onClick={() => setShowProducts(!ShowProducts)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTER
          <img
            className={`h-3 sm:hidden ${ShowProducts ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowProducts ? "" : "hidden"} sm:block `}
        >
          <p className="mb-3 text-sm font-medium ">CATEGOREIS</p>
          <div className="flex flex-col text-sm gap-2 font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={togleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={togleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={togleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Sub Categories  */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${ShowProducts ? "" : "hidden"} sm:block `}
        >
          <p className="mb-3 text-sm font-medium ">SUB CATEGORIES</p>
          <div className="flex flex-col text-sm gap-2 font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={subTogleCategory}
              />{" "}
              Top Wear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={subTogleCategory}
              />{" "}
              Bottom Wear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={subTogleCategory}
              />{" "}
              Winter Wear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side products */}
      <div className="flex-1">
        <div className=" flex justify-between text-base sm:text-2xl bm-4">
          <Title Text1={"All"} Text2={"Collection"} />
          {/* Product Sorting */}
          <select
            onChange={handleSortChange}
            value={sortType}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by Relevance</option>
            <option value="price_low_high">Sort by: Low to High</option>
            <option value="price_high_low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-4">
          {displayProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
