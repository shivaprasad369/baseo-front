import { useQueryClient } from 'react-query';
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log("Login Data:", data);
    // Send a POST request to your backend for login authentication
    try {
      const response = await fetch("https://baseo.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send form data as JSON
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        localStorage.setItem("token", result.token);
        localStorage.setItem("name", result.username);
        localStorage.setItem("email", result.email);
        queryClient.invalidateQueries(["cart-details", result.username]);
        navigate("/");
        window.location.reload();
        console.log("User logged in:", result);
      } else {
        toast.error("Login Failed: ");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again later.");
    }
  };

  return (
    <section className="w-full flex items-center justify-center">
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
      <div className="max-w-[1400px] py-[3rem] w-[100%] flex items-center justify-center">
        <div className="w-[40%] flex flex-col gap-8 bg-slate-200 p-[2rem] shadow-md">
          <h1 className="text-4xl font-bold text-center tracking-wider">
            Login
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex text-sm flex-col gap-5 w-[100%]"
          >
            <label className="flex flex-col gap-1 text-gray-600">
              <span>Email Address *</span>
              <input
                type="email"
                placeholder="Email Address*"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-2 py-3 outline-none bg-white border border-gray-300"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </label>
            <label className="flex flex-col gap-1 text-gray-600">
              <span>Password *</span>
              <input
                type="password"
                placeholder="Password*"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-2 py-3 outline-none bg-white border border-gray-300"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </label>
            <button
              type="submit"
              className="text-white text-xl font-bold tracking-wider w-full py-3 rounded-md bg-[#71c215] hover:bg-[#5aa011]"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 underline cursor-pointer"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
