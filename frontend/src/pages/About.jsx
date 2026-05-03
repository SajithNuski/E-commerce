import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Newsletter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title Text1={"ABOUT"} Text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="w-full md:max-w-112.5" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            We believe that fashion is more than just clothing—it’s a way to
            express individuality and confidence. At Zoro, we are dedicated to
            bringing you carefully curated styles that blend comfort, quality,
            and modern trends. Every piece in our collection is selected with
            attention to detail, ensuring that you not only look good but feel
            your best every day.
          </p>
          <p>
            We are passionate about delivering a seamless shopping experience,
            backed by excellent customer service and a commitment to evolving
            with the latest fashion trends.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Zoro is to empower individuals through fashion by
            providing stylish, high-quality clothing that inspires confidence
            and self-expression. We strive to make modern trends accessible to
            everyone while maintaining a commitment to comfort, affordability,
            and exceptional customer experience.
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title Text1={"WHY"} Text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col  gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600 ">
            At Zoro, quality is at the heart of everything we do. Each product
            goes through a careful selection and inspection process to ensure it
            meets our high standards of craftsmanship, durability, and comfort.
          </p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col  gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600 ">
            At Zoro, we make shopping simple, fast, and hassle-free. Our
            user-friendly platform allows you to browse, select, and purchase
            your favorite styles with ease, whether you’re at home or on the go.
          </p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col  gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600 ">
            At Zoro, our customers are at the heart of everything we do. We are
            committed to providing friendly, responsive, and reliable support at
            every step of your shopping journey. Whether you need help choosing
            the perfect outfit or assistance with your order, our dedicated team
            is always ready to help.
          </p>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default About;
