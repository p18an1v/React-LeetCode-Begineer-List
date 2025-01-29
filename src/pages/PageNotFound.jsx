import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#09090B] text-white text-center p-4">
      <h1 className="text-9xl font-bold text-white-400 animate__animated animate__fadeIn">
        404
      </h1>
      <h2 className="text-3xl font-semibold text-red-500 mt-4">
        Oops! Page Not Found
      </h2>
      <Link
        to="/"
        className="mt-6 px-8 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Go Back Home
      </Link>
      <div className="mt-8">
        <img
          className="w-64 animate__animated animate__bounceInUp"
          src="https://i.imgur.com/LnQKHYj.gif"
          alt="Not Found"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
