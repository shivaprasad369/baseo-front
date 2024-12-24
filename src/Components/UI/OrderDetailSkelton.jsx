import React from "react";

export default function OrderDetailSkelton() {
  return (
    <div className="w-[100%] flex-col gap-10 flex items-center justify-center">
      <div className="w-[100%] flex flex-col gap-3">
        <div className="w-[100%]  p-4  rounded shadow-md bg-white">
          <div className="w-[100%]  flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-start"> Order detail</h1>
            <div className="mt-4 h-10 bg-gray-300 animate-pulse rounded w-4/4"></div>
            <div className="mt-2 h-10 bg-gray-300 animate-pulse rounded w-6/6"></div>
            <div className="w-[100%] flex items-end justify-end">
            <div className="mt-2 h-10 bg-gray-300 animate-pulse rounded w-3/6"></div>

            </div>
    
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-5">
        <div className="w-[100%] p-4 border rounded shadow-md bg-white">
    <div className="h-72 bg-gray-300 animate-pulse rounded-lg"></div>
  </div>
        </div>
      </div>
    </div>
  );
}
