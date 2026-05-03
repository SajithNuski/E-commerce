import React from "react";

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 text-center">
      <h2 className="text-2xl sm:text-3xl text-purple-700 mb-3">
        Get Latest Updates
      </h2>
      <p className="text-gray-500 text-sm mb-3">SUBSCRIBE TO OUR NEWSLETTER</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-0"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full min-w-0 border border-gray-300 px-4 py-3 sm:py-2 focus:outline-none sm:rounded-l"
        />
        <button
          type="submit"
          className="bg-purple-700 text-white px-6 py-3 sm:py-2 sm:rounded-r hover:bg-purple-800 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
