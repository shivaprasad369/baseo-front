import React, { useState } from "react";
import { useForm } from "react-hook-form";

const InputField = ({ type, placeholder, register, rules, errors, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    {...register(rules.name, rules.validation)}
    className={`px-3 py-3 w-[100%] ${errors[rules.name] ? "border-[1px] border-red-500" : ""} ${className} outline-none`}
  />
);
export default InputField