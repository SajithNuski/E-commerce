import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ShopContext from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Your account successfully created. Please login.");
          setCurrentState("Login");
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[full] px-6 sm:px-0 sm:max-w-md md:max-w-lg lg:max-w-xl m-auto mt-14 gap-4 text-gray-700"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
        <p className="font-family-prata-regular text-3xl ">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-purple-700" />
      </div>
      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-700"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-700"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-700"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm -mt-2">
        <p>Forgot Password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            {" "}
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            {" "}
            Login Here
          </p>
        )}
      </div>
      <button className="bg-purple-700 text-white px-3 py-2 w-full sm:w-[40%] mt-4 cursor-pointer transition-colors duration-200 hover:bg-purple-800">
        {currentState}
      </button>
    </form>
  );
};

export default Login;
