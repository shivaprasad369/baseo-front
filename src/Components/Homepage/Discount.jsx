import React from "react";
export default function Discount() {
  return (
    <section className="w-[100%] flex items-center justify-center overflow-hidden">
      <div className="w-[100%] max-w-[1400px] px-[7%] py-[3rem]">
        <div className="w-[100%] z-30 grid grid-cols-3 gap-8 items-center">
          <div className="w-[100%] relative z-30 h-[13rem] flex flex-col gap-5  overflow-hidden">
            <img
              src={require("../../images/shop-now/shop-now-1.png")}
              alt="shopnow"
              className="-z-10
                 w-[100%] h-[100%] object-cover"
            />
            <div
              className="w-[100%] h-[100%] z-30 items-start justify-center px-[2rem] flex flex-col
               gap-5 absolute top-0 left-0"
            >
              <h1 className="text-white  text-2xl font-bold">
                50% Discount <br />
                on Cameras
              </h1>
              <div
                className="px-6 py-2 bg-white text-black tracking-widest hover:bg-black
                hover:text-white duration-500 w-fit rounded-md text-lg
                "
              >
                Shop now
              </div>
            </div>
          </div>
          <div className="w-[100%] relative z-30 h-[13rem] flex flex-col gap-5  overflow-hidden">
            <img
              src={require("../../images/shop-now/shop-now-2.png")}
              alt="shopnow"
              className="-z-10
                 w-[100%] h-[100%] object-cover"
            />
            <div
              className="w-[100%] h-[100%] z-30 items-start justify-center px-[2rem] flex flex-col
               gap-5 absolute top-0 left-0"
            >
              <h1 className="text-white  text-2xl font-bold">
                60% Discount <br />
                on Laptops
              </h1>
              <div
                className="px-6 py-2 bg-white text-black tracking-widest hover:bg-black
                hover:text-white duration-500 w-fit rounded-md text-lg
                "
              >
                Shop now
              </div>
            </div>
          </div>
          <div className="w-[100%] relative z-30 h-[13rem] flex flex-col gap-5  overflow-hidden">
            <img
              src={require("../../images/shop-now/shop-now-3.png")}
              alt="shopnow"
              className="-z-10
                 w-[100%] h-[100%] object-cover"
            />
            <div
              className="w-[100%] h-[100%] z-30 items-start justify-center px-[2rem] flex flex-col
               gap-5 absolute top-0 left-0"
            >
              <h1 className="text-white  text-2xl font-bold">
                20% Discount <br />
                on Mobiles
              </h1>
              <div
                className="px-6 py-2 bg-white text-black tracking-widest hover:bg-black
                hover:text-white duration-500 w-fit rounded-md text-lg
                "
              >
                Shop now
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
