import React, { useEffect } from "react";
import useTokenVerification from "../hooks/useTokenVerification";
import useFetchData from "../hooks/useFetchdashboard";
import OrderSkelton from "./OrderSkelton";

export default function Orderlist() {
  const { user, isVerified, isLoading1 } = useTokenVerification();
  const { data, isLoading, isError, error } = useFetchData(user.userId);

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
  if(isLoading){
    return <OrderSkelton/>
  }

  return (
    <div className="w-[100%] flex flex-col gap-2 overflow-hidden items-center justify-center">
      <div className="w-[100%] max-w-[1400px] flex items-center  py-[3rem]  justify-center">
        <div className="w-[100%] flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-start">My Orders</h1>
          <div className="w-[100%] flex flex-col">
            <table className="table-auto">
              <thead className="border-b-[1px] text-start border-gray-300">
                <tr>
                  <th>Order No</th>
                  <th> Amount(£)</th>
                  <th>Status</th>
                  <th> Order Date</th>
                  <th> Action</th>
                </tr>
              
              </thead>
                <tbody className="text-center mt-3">
                  {Object.values(groupedData)?.map((data, index) => (
                    <tr
                      key={data.UserID * index}
                      className="my-3 border-b-[1px] border-gray-300"
                    >
                      <td>{data.UserID}</td>
                      <td>
                        £
                        {data.products.reduce(
                          (total, product) =>
                            total + Number(product.product.ItemTotal),
                          0
                        )}
                      </td>
                      <td className="text-center flex items-center my-2 justify-center">
                        {" "}
                        <div className="bg-[#f5e8c1] w-fit px-2 py-[0.1em] text-[#c07451]">
                          {data.OrderStatus == null
                            ? "Order placed"
                            : data.OrderStatus}
                        </div>
                      </td>
                      <td>{data.products[0].product.OrderDate}</td>
                      <td className="text-center flex items-center my-2 justify-center">
                        <div className="text-white w-fit font-bold tracking-wider px-3 py-2 rounded-md tex text-center bg-[#63b82b]">
                          <a href={`details/${data.UserID}`}> Details</a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          
          </div>
        </div>
      </div>
    </div>
  );
}
