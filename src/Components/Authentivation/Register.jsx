import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
    const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
    
      // Sending the data to the API
      const response = await axios.post("https://baseo.onrender.com/users/register", data);
      
      if (response.status === 200) {
        // Handle success (e.g., show success message, redirect, etc.)
        toast.success("Registration successful!");
        navigate('/login'); // Redirect to login page

      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section className="w-[100%] flex items-center justify-center">
      <div className="max-w-[1400px] py-[3rem] w-[100%] flex items-center justify-center">
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
        <div className="w-[40%] flex flex-col gap-10 bg-slate-200 p-[2rem]">
          <h1 className="text-4xl font-bold text-center tracking-wider">Register</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex text-sm flex-col gap-5 w-[100%]"
          >
            {/* First Name */}
            <label className="flex flex-col gap-1 text-gray-600">
              <span>First Name *</span>
              <input
                type="text"
                placeholder="First Name*"
                {...register("firstName", { required: "First Name is required" })}
                className="w-[100%] px-2 py-3 outline-none bg-white"
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </label>

            {/* Last Name */}
            <label className="flex flex-col gap-1 text-gray-600">
              <span>Last Name *</span>
              <input
                type="text"
                placeholder="Last Name*"
                {...register("lastName", { required: "Last Name is required" })}
                className="w-[100%] px-2 py-3 outline-none bg-white"
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </label>

            {/* Email */}
            <label className="flex flex-col gap-1 text-gray-600">
              <span>Email Address*</span>
              <input
                type="email"
                placeholder="Email Address*"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-[100%] px-2 py-3 outline-none bg-white"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </label>

            {/* Password */}
            <label className="flex flex-col gap-1 text-gray-600">
              <span>Password*</span>
              <input
                type="password"
                placeholder="Password *"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                    message:
                      "Password must start with an uppercase letter, include at least one number, one special character, and be 6 or more characters long.",
                  },
                })}
                className="w-[100%] px-2 py-3 outline-none bg-white"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </label>

            {/* Confirm Password */}
            <label className="flex flex-col gap-1 text-gray-600">
              <span>Confirm Password*</span>
              <input
                type="password"
                placeholder="Confirm Password*"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value, data) =>
                    value === data.password || "Passwords do not match",
                })}
                className="w-[100%] px-2 py-3 outline-none bg-white"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </label>

            {/* Terms and Conditions */}
            <label className="flex gap-3 text-gray-600">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms and conditions",
                })}
                className="px-4 py-4 outline-none bg-white"
              />
              <div className="flex flex-col gap-1">
                <span>By clicking this button you are agreeing to our</span>
                <span className="text-md text-black underline">Terms and Conditions.*</span>
              </div>
            </label>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="text-white text-xl font-bold tracking-wider w-[100%] py-3 rounded-md bg-[#71c215]"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
