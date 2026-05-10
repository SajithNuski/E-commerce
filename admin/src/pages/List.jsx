import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
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
    };

    fetchList();
  }, [token]);

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
        {list.map((item,index) => (
          <div
            key={index}
            className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 border border-gray-300"
          >
            <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price.toFixed(2)}</p>
            <p className="text-right md:text-center cursor-pointer text-lg">X</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
