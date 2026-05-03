import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 mt-10">
      {/* Hero Content Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-4 sm:py-0">
        <div className="text-purple-700">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-0.5 bg-purple-700"></p>
            <p className="font-medium text-sm md:text-base ">OUR BESTSELLERS</p>
          </div>
          <h1 className="font-family-prata-regular text-3xl sm:py-3 lg:text-5xl loading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className=" font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-0.5 bg-purple-700"></p>
          </div>
        </div>
      </div>
      {/* Hero Content Right Side */}

      <img
        src={assets.hero_img}
        alt="Hero Image"
        className="w-full sm:w-1/2 object-cover"
      />
    </div>
  );
};

export default Hero;
