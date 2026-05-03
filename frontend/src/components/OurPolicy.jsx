import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-500">
        <div>
            <img src={assets.exchange_icon} alt="Free Shipping Icon" className="w-12 m-auto mb-5" />
            <p className="font-medium mb-1">Easy Exchange Policy</p>
            <p className="text-gray-400">We offer a hassle-free exchange policy for all our products.</p>
        </div>
        <div>
            <img src={assets.quality_icon} alt="Free Shipping Icon" className="w-12 m-auto mb-5" />
            <p className="font-medium mb-1">7-Day Return Policy</p>
            <p className="text-gray-400">We offer a 7-day return policy for all our products.</p>
        </div>
        <div>
            <img src={assets.support_img} alt="Free Shipping Icon" className="w-12 m-auto mb-5" />
            <p className="font-medium mb-1">Best Customer Support</p>
            <p className="text-gray-400">Our dedicated support team is always ready to assist you.</p>
        </div>
    </div>
  );
};

export default OurPolicy;
