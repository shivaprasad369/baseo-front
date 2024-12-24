import React, { useEffect } from "react";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Http from "./Http";
import axios from "axios";
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from "react-redux";
import { handleCount, handleToggle, handleTotal } from "../store/Cart";
import Cookies from "js-cookie";
import useTokenVerification from "../hooks/useTokenVerification";

export default function List() {
  const queryClient = useQueryClient();
  const toggle = useSelector((state) => state.cart.toggle);

  const dispatch = useDispatch();
  const cartNumber = Cookies.get("userId");
  const { isVerified, isLoading1, user } = useTokenVerification();
  const { data, isLoading, setData } = Http(); // Assume `setData` is used to update the state.
  useEffect(() => {
    if (!toggle) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [toggle]);

  const handleUpdateQuantity = async (productId, cartNumber, action) => {
    try {
      const response = await axios.put(
        "https://baseo.onrender.com/update-quantity",
        {
          id: productId,
          userId: cartNumber,
          user: isVerified ? user.userId : 1,
          number: { action: action, qty: 1 },
        }
      );

      queryClient.invalidateQueries('cart-details');
      if (response.status === 200) {
        // Update the state with new data after successful update
        const updatedData = data.map((product) => {
          if (product.ProductAttributeID === productId) {
            const newQty =
              action === "increment"
                ? product.Qty + 1
                : product.Qty > 1
                ? product.Qty - 1
                : product.Qty;
            const newItemTotal = newQty * product.Price;
            return { ...product, Qty: newQty, ItemTotal: newItemTotal };
          }
          return product;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error("Failed to update quantity:");
    }
  };
  useEffect(() => {
    const datas = data
      ?.reduce((total, product) => total + product.Price * product.Qty, 0)
      .toFixed(0);
    dispatch(handleTotal(datas));
    dispatch(handleCount(data.length));
  }, [data]);
  const calculateSubtotal = () => {
    return data
      ?.reduce((total, product) => total + product.Price * product.Qty, 0)
      .toFixed(2);
  };
  //   const deleteCartItem = useDeleteCartItem();

  const handleDelete = async (productAttributeID, cartNumber) => {
    try {
      const res = await axios.delete(
        `https://baseo.onrender.com/delete-cart-item?cartNumber=${cartNumber}&productAttributeID=${productAttributeID}&user=${
          isVerified ? user.userId : 1
        },`
      );
      if (res.status === 200) {
        queryClient.invalidateQueries(["cart-details", productAttributeID]);
        alert("Deleted successfully");
      } else {
        alert("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error deleting the cart item:");
      alert("An error occurred while deleting the item");
    }
  };

  return (
    <div
      style={{ zIndex: 50 }}
      //   onClick={()=>dispatch(handleToggle())}
      className={`${
        toggle && "hidden"
      } w-[100vw] fixed right-0 bg-[#000000bd] h-[100vh] top-0 z-90`}
    >
      <div className="absolute right-0 flex flex-col gap-5 w-[35%] h-[100%] bg-white">
        <div className="flex relative items-center px-4 py-5 shadow-lg justify-between w-[100%]">
          <h1 className="text-2xl font-bold tracking-wider">Your Cart</h1>
          <span
            onClick={() => dispatch(handleToggle())}
            className="text-2xl cursor-pointer"
          >
            <IoMdClose />
          </span>
        </div>
        <div className="w-[100%] flex flex-col gap-5 h-[100%] relative">
          <div className="h-[75%] flex px-5 flex-col gap-5 overflow-y-scroll">
            {!isLoading && data.length > 0 ? (
              data?.map((product, index) => (
                <div
                  key={index}
                  className="w-[100%] h-[8rem] flex gap-5 items-center"
                >
                  <div className="w-[25%] h-[100%]">
                    <img
                      src={"https://baseo.onrender.com/" + product.Image}
                      alt=""
                      className="h-[100%] object-cover"
                    />
                  </div>
                  <div className="w-[75%] flex flex-col gap-2">
                    <h1 className="text-sm w-[80%]">{product?.ProductName}</h1>
                    {!isLoading && (
                      <span className="text-xl font-bold text-[#93c422]">
                        ${(product?.Price * product?.Qty).toFixed(0)}
                      </span>
                    )}
                    <div className="w-[100%] items-center flex gap-2">
                      <div className="flex">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              product.ProductAttributeID,
                              product.CartNumber,
                              "increment"
                            )
                          }
                          className="w-[2.5rem] flex items-center justify-center border border-gray-400"
                        >
                          <IoMdAdd />
                        </button>
                        <input
                          type="text"
                          value={product?.Qty}
                          readOnly
                          className="w-[2.5rem] py-1 border-[1px] border-gray-400 outline-none text-center"
                        />
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              product.ProductAttributeID,
                              product.CartNumber,
                              "decrement"
                            )
                          }
                          className="w-[2.5rem] flex items-center justify-center border border-gray-400"
                        >
                          <IoMdRemove />
                        </button>
                      </div>
                      <MdDelete
                        onClick={() =>
                          handleDelete(
                            product.ProductAttributeID,
                            product.CartNumber
                          )
                        }
                        className="text-xl"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Items Present</p>
            )}
          </div>
          <div
            style={{ boxShadow: "10px 0 0 red" }}
            className="w-[100%] px-5 py-3 shadow-t-xl bottom-0 left-0"
          >
            <div className="flex w-[100%] items-center justify-between">
              <h1 className="text-xl font-[400] tracking-wider">Subtotal</h1>
              <span className="text-2xl font-bold text-[#73b61c]">
                ${calculateSubtotal()}
              </span>
            </div>
            <p className="text-xs">
              All transactions are secure and encrypted.
            </p>
            {data.length > 0 && (
              <div className="w-[100%] mt-4 uppercase text-center py-3 rounded-md bg-[#94d618] text-white text-lg font-bold tracking-wider">
                <h1>
                  {" "}
                  {!isLoading1 && isVerified ? (
                    <a href="/checkout">Go to Checkout</a>
                  ) : (
                    <a href="/login">login</a>
                  )}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
