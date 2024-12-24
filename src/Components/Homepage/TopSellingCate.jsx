import { useQuery } from 'react-query';
import axios from "axios";
import React from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function TopSellingCate() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["topsellingcat"],
    queryFn: async () => {
      try {
        const res = await axios.get("https://baseo.onrender.com/topcategories");
        if (res) {
          return res.data;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  });

  return (
    <section className="w-[100%] flex items-center justify-center overflow-hidden">
      <div className="w-[100%] flex items-center  justify-center px-[7%] py-[3rem]">
        <div className="w-[100%] flex items-center flex-col gap-10 justify-center">
          <h1 className="text-4xl font-bold text-center ">
            Top Selling Categories
          </h1>
          {!isLoading && (
            <div className="w-[100%]  items-center">
              <Swiper
                slidesPerView={6}
                spaceBetween={0}
                loop={true}
                speed={"900"}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper w-[100%] flex overflow-hidden"
              >
                {data?.map((data, index) => (
                  <SwiperSlide key={data.ProductID} >
                    <div
                      key={data.ProductID}
                      className="w-[100%] relative  flex flex-col  items-center justify-center gap-5 rounded-sm p-3 duration-500"
                    >
                      <div className=" w-[8rem] h-[8rem]  rounded-full border-[1px] flex items-center justify-center">
                        <img
                          src={"https://baseo.onrender.com" + data.Image}
                          className="w-[4rem]"
                          alt={data.ProductName}
                        />
                      </div>
                      <h1 className="text-center text-lg font-semibold traking-wider">
                        {data.Name}
                      </h1>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
