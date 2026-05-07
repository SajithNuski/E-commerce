// import React from 'react'
import Navebar from "./components/Navebar"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"
import Add from "./pages/Add"
import List from "./pages/List"
import Order from "./pages/Order"
import { useEffect, useState } from "react"
import Login from "./components/Login"
 import { ToastContainer} from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {
        token === "" ? <Login setToken={setToken}/> : 
    <>
    <Navebar setToken={setToken} />
    <hr className="text-gray-300" />
    <div className="flex w-full">
    <Sidebar/>
    <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
      <Routes>
        <Route path="/Add" element={<Add token={token}/>} />
        <Route path="/List" element={<List token={token}/>} />
        <Route path="/Order" element={<Order token={token}/>} />
      </Routes>

    </div>
    </div>
    </>
      }
    </div>
  )
}

export default App