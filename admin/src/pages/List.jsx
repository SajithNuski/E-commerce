import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { backendUrl, currency } from "../config/api";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setList(response.data.products || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const removeHandler = async (id) => {
    try {
      const response = await axios.delete(backendUrl + "/api/product/remove", {
        data: { id },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // update local list state
        setList((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.resolve().then(fetchList);
  }, [fetchList]);

  return (
    <>
      <p className="mb-2"> All product Lsit</p>
      <div className="flex flex-col gap-2">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 border border-gray-300 bg-gray-50 text-small">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Actions</b>
        </div>
        {/* list items */}
        {list.map((item) => (
          <div
            key={item._id}
            className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 border border-gray-300"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-16 h-16 object-cover"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price.toFixed(2)}
            </p>
            <p
              onClick={() => removeHandler(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
