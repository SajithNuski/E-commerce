import { createContext } from "react";
import { products } from "../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShopContext = createContext();

const ShopProvider = (props) => {
  const currency = "$"; // Example currency, you can change it as needed
  const delivery_fee = 10; // Example delivery fee, you can change it as needed
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error("Error occurred while calculating cart count:", error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, newQuantity) => {
    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      return; // Safety check
    }

    if (newQuantity <= 0) {
      delete cartData[itemId][size]; // Remove the size

      // If no sizes left for this product, remove the product
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = newQuantity;
    }

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item] * itemInfo.price;
          }
        } catch (error) {
          console.error("Error occurred while calculating cart amount:", error);
        }
      }
      return totalAmount;
    }
  };

  const value = {
    // Add your shop-related data and functions here
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {/* Your app components go here */}
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopProvider };
export default ShopContext;
