import React, { useEffect, useState } from "react";
import useTokenVerification from "../hooks/useTokenVerification";
import useFetchData from "../hooks/useFetchdashboard";
import { useParams } from "react-router";
import OrderDetailSkelton from "../UI/OrderDetailSkelton";

export default function Details() {
  const [load, setLoad] = useState(false);
  const { user, isVerified, isLoading1 } = useTokenVerification();
  const { data, isLoading, isError, error } = useFetchData(user.userId);
  const [details, setDetails] = useState([]);
  const { id } = useParams();

  const groupedData = {};
  if (Array.isArray(data)) {
    data.forEach((product) => {
      if (!groupedData[product.OrderNumber]) {
        groupedData[product.OrderNumber] = {
          UserID: product.OrderNumber,

          products: [],
        };
      }
      groupedData[product.OrderNumber].products.push({
        product,
      });
    });
  }
  const result = Object.values(groupedData);
  useEffect(() => {
    const data = result.filter((data) => data.UserID === id);
    setDetails(data);
    setLoad(true);
    console.log(data);
  }, [data, id]);

  console.log(load && details);
if(isLoading){
  return <OrderDetailSkelton/>
}
  return (
    <div className="w-[100%] flex items-center justify-center overflow-hidden ">
      {!isLoading ? <div className="w-[100%] max-w-[1400px] flex items-center justify-center ">
        <div className="w-[100%] flex flex-col gap-5">
          <div className="text-2xl flex items-center gap-2 tracking-wide font-bold">
            Order Detail #{details[0]?.UserID}
            <span className="text-[1rem] text-[#926a2f] h-fit bg-[#ebdba7] px-2 py-2 leading-[10px] font-normal">
              Order placed
            </span>
          </div>
          <table className="table-auto">
            <thead className="border-b-[1px] border-gray-300">
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total(£)</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {load && details ? (
                details[0]?.products.map((data, index) => (
                  <tr
                    key={data?.product?.FinalCartID * index}
                    className="border-b-[1px] border-gray-300"
                  >
                    <td className="w-fit mt-2">
                      <img
                        src={"https://baseo.onrender.com/" + data.product.Image}
                        alt="baseo"
                        className="w-[2rem] my-2 "
                      />
                    </td>
                    <td>{data.product.ProductName}</td>
                    <td>{data.product.Price}</td>
                    <td>{data.product.Qty}</td>
                    <td>{data.product.ItemTotal}</td>
                  </tr>
                ))
              ) : (
                <div className="text-sm font-bold tracking-wider items-center w-[100%] h-[100%] flex justify-center">
                  Loading
                </div>
              )}
              <tr className="border-b-[1px] border-gray-300">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className="font-bold my-2">Item Total :</div>
                </td>
                <td>
                  {load &&
                    details &&
                    details[0]?.products.reduce(
                      (total, product) =>
                        total + Number(product.product.ItemTotal),
                      0
                    )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3 flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Order Detail</h1>
            <div className="w-[100%] border-[1px] border-gray-300 p-[1rem] rounded-sm">
              <div className="w-[100%] grid grid-cols-2">
                <div className="w-[100%] flex flex-col gap-3">
                  <h1 className="font-bold">
                    Order No : <span className="font-normal">{details[0]?.UserID}</span>
                  </h1>
                  <span>Item(s) total</span>
                  <span>Shipping</span>
                  <span>Sub total</span>
                  <span className="font-bold">Final Payment</span>
                </div>
                <div className="w-[100%] items-end flex flex-col gap-3">
                  <h1 className="font-bold">
                    Order Date :{" "}
                    <span className="font-normal">{details[0]?.products[0].product?.OrderDate}</span>
                  </h1>
                  <span>£ {load &&
                    details &&
                    details[0]?.products.reduce(
                      (total, product) =>
                        total + Number(product.product.ItemTotal),
                      0
                    )}</span>
                  <span>FREE</span>
                  <span>£ {load &&
                    details &&
                    details[0]?.products.reduce(
                      (total, product) =>
                        total + Number(product.product.ItemTotal),
                      0
                    )}</span>
                  <span className="font-bold">£ {load &&
                    details &&
                    details[0]?.products.reduce(
                      (total, product) =>
                        total + Number(product.product.ItemTotal),
                      0
                    )} </span>
                </div>
              </div>
              <div className="mt-8 border-b-[1px] border-gray-300" />
              <h1 className=" py-4 font-bold">Payment Details</h1>
              <div className="w-[100%] grid grid-cols-2">
                <div className="w-[100%] flex flex-col gap-3">
                  <h1 className="">Payment Date</h1>
                  <span>Payment Transaction Ref.</span>
                </div>
                <div className="w-[100%] items-end flex flex-col gap-3">
                  <h1 className="">{details[0]?.products[0]?.product.OrderDate}</h1>
                  <span>{details[0]?.products[0]?.product.stripeid}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 ">
              <div className="flex w-[100%] flex-col gap-2">
                <h1 className="font-bold text-lg">Billing Address</h1>
                <div className="border-[1px] flex flex-col gap-1 border-gray-300 rounded-sm p-[1rem]">
                    <span>{details[0]?.products[0]?.product.BillingFirstname}  {details[0]?.products[0]?.product.BillingLastname}</span>
                    <span>{details[0]?.products[0]?.product.BillingAddress}</span>
                    <span>{details[0]?.products[0]?.product.BillingCity}, {details[0]?.products[0]?.product.BillingCountry} - {details[0]?.products[0]?.product.BillingPostalcode} </span>
                  <div className="flex items-center gap-2">
                    <h1 className="">Tel :</h1>{" "}
                    <span className="text-md font-bold">{details[0]?.products[0]?.product.BillingPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="">Email :</h1>{" "}
                    <span className="text-md font-bold">{details[0]?.products[0]?.product.BillingEmailID}</span>
                  </div>
                </div>
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <h1 className="font-bold text-lg">Shipping Address</h1>
                <div className="border-[1px] flex flex-col gap-1 border-gray-300 rounded-sm p-[1rem]">
                    <span>{details[0]?.products[0]?.product.ShippingFirstname}  {details[0]?.products[0]?.product.ShippingLastname}</span>
                    <span>{details[0]?.products[0]?.product.ShippingAddress}</span>
                    <span>{details[0]?.products[0]?.product.ShippingCity}, {details[0]?.products[0]?.product.ShippingCountry} - {details[0]?.products[0]?.product.ShippingPostalcode} </span>
                  <div className="flex items-center gap-2">
                    <h1 className="">Tel :</h1>{" "}
                    <span className="text-md font-bold">{details[0]?.products[0]?.product.ShippingPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="">Email :</h1>{" "}
                    <span className="text-md font-bold">{details[0]?.products[0]?.product.ShippingEmailID}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>:<div className="flex items-center justify-center text-lg font-bold ">Loading</div>}
    </div>
  );
}
