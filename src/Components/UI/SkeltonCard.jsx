import React from "react";

const SkeletonCard = () => (
  <div className="w-[100%] flex items-center justify-center ">
    <div className="w-[100%] flex max-w-[1400px] px-[8%] py-[3rem]">
      <div className="w-[100%] flex gap-10">
        <div className="w-[30%] h-fit max-w-xs p-4 border rounded shadow-md bg-white">
          <div className="h-16 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="mt-4 h-6 bg-gray-300 animate-pulse rounded w-1/4"></div>
          <div className="mt-2 h-4 bg-gray-300 animate-pulse rounded w-3/5"></div>
          <div className="h-4 bg-gray-300 animate-pulse rounded w-2/5"></div>
        </div>
        <div className="w-[80%] grid grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5].map((data, index) => (
            <div
              key={data}
              className="w-[100%] max-w-sm p-4 border rounded shadow-md bg-white"
            >
              <div className="h-48 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="mt-4 h-6 bg-gray-300 animate-pulse rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-300 animate-pulse rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 animate-pulse rounded w-4/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default SkeletonCard;
