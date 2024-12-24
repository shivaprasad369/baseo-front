import axios from "axios";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
const loginUser = async (credentials) => {
  const { data } = await axios.post(
    "https://baseo.onrender.com/admin/login",
    credentials
  );
  return data;
};

export default function AdminLogin() {
  const [error, setError] = useState("");
  const token = localStorage.getItem("admintoken");
  const nameRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const {
    mutate,
    isLoading,
    isError,
    error: mutationError,
  } = useMutation(loginUser, {
    onSuccess: (data) => {
      toast.success("Login successful");
      localStorage.setItem("admintoken", data.token);
      formRef.current.reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    mutate({
      UserName: nameRef.current.value,
      Password: passwordRef.current.value,
    });
  };

  return (
    <section className="w-[100%] flex flex-col gap-5 justify-center items-center">
      <Toaster />
      <div className="w-[100%] flex flex-col gap-5 max-w-[1400px] px-[8%] ">
        <div className="w-[100%] flex flex-col gap-10 items-center justify-center">
          <div className="w-[100%] border-b-[1px] border-gray-300 py-2 flex items-center justify-between">
            <img
              src={require("./asset/logo.png")}
              alt="baseo "
              className="w-[12rem] "
            />
          </div>
          <div
            className="w-[30%] flex  mt-10  flex-col gap-10 p-[1rem] border-[1px] border-gray-300 
                items-center justify-center "
          >
            <h1 className="text-4xl font-light text-gray-500">
              Administrator Login
            </h1>
            <form
              onSubmit={handleSubmit}
              ref={formRef}
              action=""
              className="w-[100%] flex mt-5 flex-col gap-5"
            >
              <input
                type="text"
                ref={nameRef}
                name="username"
                placeholder="Username"
                className="w-[100%] border-[1px] border-gray-300 py-1 outline-none
                         px-[1rem]"
                required
              />
              <input
                type="password"
                name="password"
                ref={passwordRef}
                placeholder="Password"
                className="w-[100%] border-[1px] border-gray-300 py-1 outline-none
                         px-[1rem]"
                required
              />
              <div className="w-[100%] flex justify-between items-center">
                <button
                  type="submit"
                  className=" px-5 py-1 w-fit text-white bg-[#21b483]"
                >
                  Login
                </button>
                <a
                  href="/admin/forget-password"
                  className="text-gray-600 underline hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
