import React from "react";
import { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max:w-96 m-auto mt-14 gap-4 text-gray-700  ">
      <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
        <p className="font-family-prata-regular text-3xl ">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-purple-700" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-[40%] px-3 py-2 border border-gray-700"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        className="w-[40%] px-3 py-2 border border-gray-700"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-[40%] px-3 py-2 border border-gray-700"
        placeholder="Password"
        required
      />
      <div className="w-[40%] flex justify-between text-sm mt-[-8px]">
        <p>Forgot Password?</p>
        {currentState === "Login" ? <p onClick={()=>setCurrentState("Sign Up")} className="cursor-pointer"> Create account</p> : <p onClick={()=>setCurrentState("Login")} className="cursor-pointer"> Login Here</p>}
      </div>
      <button className="bg-purple-700 text-white px-3 py-2 w-[40%] mt-4">
        {currentState}
      </button>
    </form>
  );
};

export default Login;
