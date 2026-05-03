import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title Text1={"CONTACT"} Text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} className="w-full md:max-w-120" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-600">206 Fashion Street, Style City, USA</p>
          <p className="text-gray-600">
            Phone: (123) 456-7890 <br /> Email: info@zoro.com{" "} <br/>
            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
          </p>
          <p className="text-gray-600 font-semibold text-xl">
            Careers at Forever
          </p>
          <p className="text-gray-600 -mt-8px">Learn more about joining our team!</p>
          <button className="border-gray-700 border text-purple-700 px-8 py-5 text-sm hover:bg-purple-700 hover:text-white transition-all duration-500">
            View Careers
          </button>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Contact;
