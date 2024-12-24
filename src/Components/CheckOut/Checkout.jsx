import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddressForm from "./AddressForm";
import useTokenVerification from "../hooks/useTokenVerification";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import { useQuery } from 'react-query';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import useCheckout from "../hooks/useCheckout";
import DetailSkelton from "../UI/DetailSkelton";
export default function Checkout() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const useData = useSelector((state) => state.cart.billing);
  const { isVerified, isLoading1, error, user } = useTokenVerification();
  const [vouchar, setVoucher] = useState(false);
  const cartNumber = Cookies.get("userId");
  const orderId = Cookies.get("orderId");
  const userData=useData && useData
console.log(userData)
  const {
    isLoading,
    error: error1,
    data: datas,
  } = useQuery({
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
  
  }, [isVerified, isLoading1,datas]);
  const { checkout, data: data1, setData } = useCheckout();
  const onSubmit = (data) => {
    const shippingInfo = data.sameAsBilling
      ? {
          ShippingFirstname: data.billingFirstName,
          ShippingLastname: data.billingLastName,
          ShippingAddress: data.billingAddress,
          ShippingAddressLine2: data.billingApartment || null,
          ShippingCity: data.billingCity,
          ShippingPostalcode: data.billingPostal,
          ShippingCountry: data.billingCountry,
          ShippingEmailID: data.billingEmail,
          ShippingPhone: data.billingPhone,
        }
      : {
          ShippingFirstname: data.shippingFirstName,
          ShippingLastname: data.shippingLastName,
          ShippingAddress: data.shippingAddress,
          ShippingAddressLine2: data.shippingApartment || null,
          ShippingCity: data.shippingCity,
          ShippingPostalcode: data.shippingPostal,
          ShippingCountry: data.shippingCountry,
          ShippingEmailID: data.shippingEmail,
          ShippingPhone: data.shippingPhone,
        };
    const orderNumber = orderId
      ? orderId
      : "ORD" + Math.floor(Math.random() * 9000) + 1000;
    Cookies.set("orderId", orderNumber);
    const grandItemTotal = datas
      ?.reduce((acc, item) => acc + item.SellingPrice * item.Qty, 0)
      .toFixed(1);
    const grandTotal = (parseFloat(grandItemTotal) + 10).toFixed(1);
    checkout({
      UserID: user.userId,
      OrderNumber: orderNumber,
      BillingFirstname: data.billingFirstName,
      BillingLastname: data.billingLastName,
      BillingAddress: data.billingAddress,
      BillingAddressLine2: data.billingApartment || null,
      BillingCity: data.billingCity,
      BillingPostalcode: data.billingPostal,
      BillingCountry: data.billingCountry,
      BillingEmailID: data.billingEmail,
      BillingPhone: data.billingPhone,
      ...shippingInfo,
      VoucherNo: vouchar ? data.Voucherprice : null,
      GrandItemTotal: grandItemTotal,
      GrandTotal: grandTotal,
      ShippingPrice: 10, // Flat shipping fee of 10
      items: datas.map((item) => ({
        productAttributeID: item.ProductAttributeID,
        quantity: item.Qty,
        OrderNumber: orderNumber,
      })),
    });
    reset();
  };
  useEffect(() => {
    setValue("billingFirstName", userData?.BillingFirstname);
    setValue("billingLastName", userData?.BillingLastname);
    setValue("billingAddress", userData?.BillingAddress);
    setValue("billingApartment", userData?.BillingAddressLine2);
    setValue("billingCity", userData?.BillingCity);
    setValue("billingPostal", userData?.BillingPostalcode);
    setValue("billingCountry", userData?.BillingCountry);
    setValue("billingEmail", userData?.BillingEmailID);
    setValue("billingPhone", userData?.BillingPhone);
    setValue("shippingFirstName", userData?.ShippingFirstname);
    setValue("shippingLastName", userData?.ShippingLastname);
    setValue("shippingAddress", userData?.ShippingAddress);
    setValue("shippingApartment", userData?.ShippingAddressLine2);
    setValue("shippingCity", userData?.ShippingCity);
    setValue("shippingPostal", userData?.ShippingPostalcode);
    setValue("shippingCountry", userData?.ShippingCountry);
    setValue("shippingEmail", userData?.ShippingEmailID);
    setValue("shippingPhone", userData?.ShippingPhone);
  }, [userData]);
  if (!datas) {
    return !isLoading ? navigate("/") :<DetailSkelton/>; 
  }

  return (
    <section className="w-[100%] flex items-center justify-center overflow-hidden">
      <div className="w-[100%] max-w-[1400px] px-[7%] py-[3rem] flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[100%] flex gap-10"
        >
          <div className="w-[50%] h-fit flex flex-col gap-5 bg-[#d8d7d6] p-[2rem] border-[0.5px] border-gray-400">
            <AddressForm
              register={register}
              errors={errors}
              title="Billing Address"
              prefix="billing"
            />
            <div className="flex w-[100%] gap-5 items-center">
              <input
                type="checkbox"
                {...register("sameAsBilling")}
                onChange={() => setSameAsBilling(!sameAsBilling)}
              />
              <span>Shipping address same as billing address</span>
            </div>
            {!sameAsBilling && (
              <AddressForm
                register={register}
                errors={errors}
                title="Shipping Address"
                prefix="shipping"
              />
            )}
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
            <div className="flex items-end justify-end  w-[100%]">
              <h1
                onClick={() => setVoucher(!vouchar)}
                className={`text-lg font-semibold tracking-wider cursor-pointer underline`}
              >
                {!vouchar ? `Add Vouchar` : "Remove Vouchar"}
              </h1>
            </div>
            {vouchar && (
              <div className="w-[100%] duration-500 flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                  <div className="w-[100%] flex gap-3 ">
                    <label
                      htmlFor="Voucher code"
                      className="flex flex-col gap-1 w-[50%]  "
                    >
                      <span className="font-bold tracking-wider">
                        Vouchar code
                      </span>
                      <input
                        type="text"
                        placeholder="Vouchar Code"
                        name="code"
                        className="outline-none px-2 py-2 border-[1px] border-gray-300 bg-slate-100"
                      />
                    </label>
                    <label
                      htmlFor="Voucher value"
                      className="flex flex-col gap-1 w-[50%]  "
                    >
                      <span className="font-bold tracking-wider">
                        Vouchar value
                      </span>
                      <input
                        type="number"
                        placeholder="Vouchar value"
                        name="value"
                        className="outline-none px-2 py-2 border-[1px] border-gray-300 bg-slate-100"
                      />
                    </label>
                  </div>
                  <div className="w-[100%] flex gap-3 ">
                    <label
                      htmlFor="issued date"
                      className="flex flex-col gap-1 w-[50%]  "
                    >
                      <span className="font-bold tracking-wider">
                        Issued Date
                      </span>
                      <input
                        type="date"
                        placeholder="Issued Date"
                        name="issued"
                        className="outline-none px-2 py-2 border-[1px] border-gray-300 bg-slate-100"
                      />
                    </label>
                    <label
                      htmlFor="Expiry date"
                      className="flex flex-col gap-1 w-[50%]  "
                    >
                      <span className="font-bold tracking-wider">
                        Expiry date
                      </span>
                      <input
                        type="date"
                        placeholder="Expiry date"
                        name="expiry"
                        className="outline-none px-2 py-2 border-[1px] border-gray-300 bg-slate-100"
                      />
                    </label>
                  </div>
                  <input
                    type="button"
                    value={"Add"}
                    className="bg-black rounded-md px-5 py-3 text-white font-bold w-fit"
                  />
                </div>
                <div className="w-[100%] flex items-center justify-between">
                  <span className="text-lg tracking-wider">Items Total </span>{" "}
                  <span className="font-bold text-xl text-[#45a519]">
                    £
                    {(
                      datas?.reduce(
                        (acc, data) => acc + data.SellingPrice * data.Qty,
                        0
                      ) + 10
                    ).toFixed(1)}
                  </span>
                </div>
                <h1 className="text-xs tracking-wider">
                  All transactions are secure and encrypted.
                </h1>
              </div>
            )}
            <input
              type="submit"
              className="px-4 py-2 bg-[#4ab420] capitalize font-bold tracking-wider text-white rounded"
              value={"Procced to review & Checkout"}
            />
            <a
              href={"."}
              className="text-lg font-semibold tracking-wider   flex items-center gap-1"
            >
              <FaArrowLeftLong />
              <span className="underline">Continue Shopping</span>{" "}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
