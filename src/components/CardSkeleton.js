import React from "react";

const CardSkeleton = () => {
  return (
    <div className="max-w-screen rounded overflow-hidden shadow-2xl mx-2 my-2 p-2">
      <div className="flex items-center justify-between mt-2 text-black">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-300 rounded animate-pulse ml-2"></div>
        </div>
        <div className="px-2 py-1 rounded-lg bg-white text-black animate-pulse">
          <h3 className="w-24 h-4 bg-gray-300 rounded animate-pulse"></h3>
        </div>
      </div>
      <hr className="my-3 border-t-2 border-gray-300" />
      <h2 className="text-2xl font-bold text-center my-2 text-black w-48 h-6 bg-gray-300 rounded animate-pulse"></h2>
      <div className="w-full h-96 bg-gray-300 rounded-lg animate-pulse"></div>
      <hr className="my-3 border-t-2 border-gray-300" />
      <div className="mb-4 text-md font-normal text-black flex justify-between">
        <span className="text-lg font-semibold text-black w-16 h-4 bg-gray-300 rounded animate-pulse"></span>
        <div className="text-md font-normal text-gray-600 animate-pulse">
          <span className="mr-2 inline-flex items-center px-2 py-1 rounded-full bg-gray-300 text-gray-700 w-16 h-4  animate-pulse"></span>
          <span className="mr-2 inline-flex items-center px-2 py-1 rounded-full bg-gray-300 text-gray-700 w-16 h-4 "></span>
        </div>
      </div>
      <div className="text-lg font-medium text-black  w-60 h-10 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default CardSkeleton;
