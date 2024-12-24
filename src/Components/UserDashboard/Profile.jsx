import React, { useEffect, useRef, useState } from "react";
import useTokenVerification from "../hooks/useTokenVerification";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
export default function Profile() {
  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    first: "",
    last: "",
    email: "",
  });
  const { isVerified, isLoading1, user } = useTokenVerification();
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put("https://baseo.onrender.com/users", {
        userId: Number(user.userId),
        firstName: firstRef.current.value,
        lastName: lastRef.current.value,
        email: emailRef.current.value,
      })
      .then((res) => {
        toast.success("Profile updated successfully");
      })
      .catch((res) => {
        toast.error("Failed to update profile");
      });
  };
  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://baseo.onrender.com/users/info?userId=${user.userId}`
        );
        setInfo({
          first: res.data.user.FirstName,
          last: res.data.user.LastName,
          email: res.data.user.EmailID,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setLoading(false);
      }
    };

    getDetails();
  }, [user]);
  if (loading) {
    return (
      <div className="w-[100%]  flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-start">My Profile</h1>
        <div className="w-[100%] grid grid-cols-2  gap-3">
          <div className="mt-4 h-10 bg-gray-300 animate-pulse rounded w-4/4"></div>
          <div className="mt-4 h-10 bg-gray-300 animate-pulse rounded w-6/6"></div>
        </div>
        <div className="mt-2 h-10 bg-gray-300 animate-pulse rounded w-6/6"></div>
        <div className="mt-2 h-10 bg-gray-300 animate-pulse rounded w-3/6"></div>
      </div>
    );
  }
  return (
    <div className="w-[100%]  overflow-hidden">
      <div className="W-[100%] flex flex-col gap-10">
        <Toaster
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <h1 className="text-3xl font-bold tracking-wider">My Profile</h1>
        {isVerified && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-[60%] "
          >
            <div className="flex w-[100%] itms-center gap-2">
              <label className="flex flex-col w-[50%] gap-1 text-gray-600">
                <span className="text-sm">First Name *</span>
                <input
                  type="text"
                  ref={firstRef}
                  defaultValue={info.first}
                  placeholder="First Name*"
                  className="px-2 py-3 outline-none border-[1px] border-gray-300 "
                />
              </label>
              <label className="flex flex-col w-[50%] gap-1 text-gray-600">
                <span className="text-sm">Last Name *</span>
                <input
                  type="text"
                  ref={lastRef}
                  defaultValue={info.last}
                  placeholder="Last Name*"
                  className="px-2 py-3 outline-none border-[1px] border-gray-300 "
                />
              </label>
            </div>
            <label className="flex flex-col w-[100%] gap-1 text-gray-600">
              <span className="text-sm">Email * </span>
              <input
                type="email"
                ref={emailRef}
                defaultValue={info.email}
                placeholder="Email*"
                className="px-2 py-3 outline-none border-[1px] border-gray-300 "
              />
            </label>
            <button className="w-fit px-4 py-3 rounded-sm bg-[#37bd32]  font-bold text-white">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
