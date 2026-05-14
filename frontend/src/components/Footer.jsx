import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            {/* Footer content */}
            Discover the latest trends in fashion and accessories with our
            curated collection. Shop now to elevate your style and express
            yourself with confidence. Experience the best of fashion at your
            fingertips.
          </p>
        </div>
        <div className="">
          <p className="font-medium text-2xl mb-5 text-purple-700">
            Quick Links
          </p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-800">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-800">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-2xl mb-5 text-purple-700">
            Contact Us
          </p>
          <p className="text-gray-600">Phone: +94 123 456 789</p>
          <p className="text-gray-600">
            123 Fashion Street, Style City, Srilanka
          </p>
          <p className="text-gray-600">Email: info@zoro.com</p>
        </div>
      </div>
      <div>
        <hr className="border-gray-300" />
        <p className="text-center text-gray-600 py-4 font-light text-sm">
          &copy; {new Date().getFullYear()} Zoro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
