import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from 'react-query';
import Cookies from "js-cookie";
import axios from "axios";
import useTokenVerification from "../hooks/useTokenVerification";
import { useNavigate } from "react-router";
import CheckoutForm from "./Checkoutform";
import { useDispatch, useSelector } from "react-redux";
import { handleBilling, handleTotal } from "../store/Cart";
import { FaRegEdit } from "react-icons/fa";
import DetailSkelton from "../UI/DetailSkelton";
const Details = ({ name, head }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="font-bold ">{head}:</span>
      <span>{name}</span>
    </div>
  );
};
export default function CheckoutSum() {
  const { isVerified, isLoading1, user } = useTokenVerification();
  const userDate = useSelector((state) => state.cart.billing);
const [total,setTotal]=useState(0)
  const navigate = useNavigate();
  const cartNumber = Cookies.get("userId");
  const queryClient = useQueryClient();
  const orderId = Cookies.get("orderId");
  const dispatch = useDispatch();
  const { isLoading, data: datas } = useQuery({
    queryKey: ["cart-Checkout", user?.userId],
    queryFn: async () => {
      if (!cartNumber) {
        return []; // Return an empty array if no cartNumber
      }
      try {
        const response = await axios.get(
          `https://baseo.onrender.com/get-cart-by-number`,
          {
            params: { cartNumber, user: user.userId },
          }
        );

        return response.data.data || [];
      } catch (err) {
        console.error("Error fetching cart details:");
        throw err;
      }
    },
  });
  useEffect(() => {
    if (!isLoading1 && !isVerified) {
      return navigate("/login");
    }
   
  }, [isVerified, isLoading1]);
  // Render Logic
 
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(datas))
    handleTotal(handleTotal(datas && datas?.reduce((acc, item) => acc + item.SellingPrice * item.Qty, 0)+10))
  },[datas])
  useEffect(() => {
    const handleGetDetails = async () => {
      try {
        const res = await axios.get(`https://baseo.onrender.com/checkout`, {
          params: { user: user.userId, orderId: orderId },
        });
        dispatch(handleBilling(res.data.data));
        const dataString = JSON.stringify(res.data.data);
        localStorage.setItem('shipping',dataString)
      } catch (error) {
        console.error("Error fetching product details:");
      }
    };
    handleGetDetails();
  }, [orderId]);
  
   if (!datas) {
    return !isLoading ? navigate("/") :<DetailSkelton/>; 
   }
  return (
    <section className="w-[100%] flex items-center justify-center overflow-hidden">
      <div className="w-[100%] max-w-[1400px] px-[7%] py-[3rem] flex items-center justify-center">
        <div className="w-[100%] flex gap-10">
          <div className="w-[50%] h-fit flex flex-col gap-5 bg-[#fff] p-[2rem] border-[0.5px] border-gray-400">
            <div className="w-[100%] flex flex-col gap-10 ">
              <div className="w-[100%] flex flex-col gap-5">
                <div className="w-[100%] flex items-center justify-between ">
                  <h1 className="text-xl font-bold tracking-wider">
                    Billing Address
                  </h1>
                  <FaRegEdit
                    onClick={() => navigate("/checkout")}
                    className="text-xl text-[#45a817] cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Details head={"Name"} name={userDate?.BillingFirstname} />
                  <Details head={"Email"} name={userDate?.BillingEmailID} />
                  <Details head={"Country"} name={userDate?.BillingCountry} />
                  <Details
                    head={"Address Line 1"}
                    name={userDate?.BillingAddress}
                  />
                  <Details
                    head={"Address Line 2"}
                    name={userDate?.BillingAddressLine2}
                  />
                  <Details head={"City"} name={userDate?.BillingCity} />
                  <Details
                    head={"Postal Code"}
                    name={userDate?.BillingPostalcode}
                  />
                  <Details
                    head={"Phone Number"}
                    name={userDate?.BillingPhone}
                  />
                </div>
              </div>
              <div className="w-[100%] border-t-[1px] border-gray-400" />
              <div className="w-[100%] flex flex-col gap-5">
                <div className="w-[100%] flex items-center justify-between ">
                  <h1 className="text-xl font-bold tracking-wider">
                    Shipping Address
                  </h1>
                  <FaRegEdit
                    onClick={() => navigate("/checkout")}
                    className="text-xl text-[#45a817] cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Details head={"Name"} name={userDate?.ShippingFirstname} />
                  <Details head={"Email"} name={userDate?.ShippingEmailID} />
                  <Details head={"Country"} name={userDate?.ShippingCountry} />
                  <Details
                    head={"Address Line 1"}
                    name={userDate?.ShippingAddress}
                  />
                  <Details
                    head={"Address Line 2"}
                    name={userDate?.ShippingAddressLine2}
                  />
                  <Details head={"City"} name={userDate?.ShippingCity} />
                  <Details
                    head={"Postal Code"}
                    name={userDate?.ShippingPostalcode}
                  />
                  <Details
                    head={"Phone Number"}
                    name={userDate?.ShippingPhone}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%] h-fit flex flex-col gap-5 border-[1px] border-gray-300 p-[2rem]">
            {!isLoading &&
              datas?.map((data, index) => (
                <div
                  key={data?.TempCartID}
                  className="px-[2rem] py-3 border-[1px] border-gray-300 items-center  flex justify-between gap-5"
                >
                  <img
                    src={`https://baseo.onrender.com/${data.Image}`}
                    className="w-[3rem]"
                    alt=""
                  />
                  <h1 className="text-md text-center font-bold tracking-wider ">
                    {data.ProductName}
                  </h1>
                  <span className="text-lg font-bold text-[#448a15]">
                    £{(data.SellingPrice * data.Qty).toFixed(1)}
                  </span>
                </div>
              ))}
            <div className="w-[100%] flex justify-between ">
              <div className=" flex flex-col">
                <span className="text-xl tracking-wider">Grandtotal:</span>
                <p className="text-xs">
                  All transactions are secure and encrypted.
                </p>
              </div>
              <span className="text-xl font-bold flex  text-[#448a15]">
                £{" "}
                {(
                  datas?.reduce(
                    (acc, item) => acc + item.SellingPrice * item.Qty,
                    0
                  ) + 10
                ).toFixed(1)}
              </span>
            </div>
            <CheckoutForm info={total} />
           
          </div>
        </div>
      </div>
    </section>
  );
}
