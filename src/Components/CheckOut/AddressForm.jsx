import React from "react";

import InputField from "./InputField";


const AddressForm = ({ register, errors,setValue, title, prefix = "" }) => (
  <div className="w-[100%] h-[100%] flex flex-col gap-5">
    <h1>{title}</h1>
    <div className="flex gap-5 items-center w-[100%]">
      <div className="w-[50%]">
        <InputField
          type="text"
          placeholder="First Name *"
          register={register}
          rules={{ name: `${prefix}FirstName`, validation: { required: "First name is required", minLength: { value: 2, message: "Must be at least 2 characters" } } }}
          errors={errors}
        />
      </div>
      <InputField
        type="text"
        placeholder="Last Name"
        register={register}
        rules={{ name: `${prefix}LastName`, validation: { required: "Last name is required", minLength: { value: 2, message: "Must be at least 2 characters" } } }}
        errors={errors}
        className="w-[50%]"
      />
    </div>
    <InputField
      type="text"
      placeholder="Address *"
      register={register}
      rules={{ name: `${prefix}Address`, validation: { required: "Address is required", minLength: { value: 5, message: "Must be at least 5 characters" } } }}
      errors={errors}
    />
    <InputField
      type="text"
      placeholder="Apartment, suite, etc. (optional)"
      register={register}
      rules={{ name: `${prefix}Apartment` }}
      errors={errors}
    />
    <div className="flex gap-5 items-center w-[100%]">
      <div className="w-[50%]">
        <InputField
          type="text"
          placeholder="City *"
          register={register}
          rules={{ name: `${prefix}City`, validation: { required: "City is required", minLength: { value: 3, message: "Must be at least 3 characters" } } }}
          errors={errors}
        />
      </div>
      <InputField
        type="number"
        placeholder="Postal Code"
        register={register}
        rules={{ name: `${prefix}Postal`, validation: { required: "Postal Code is required", minLength: { value: 2, message: "Must be at least 2 characters" } } }}
        errors={errors}
        className="w-[50%]"
      />
    </div>
    <InputField
      type="text"
      placeholder="Country *"
      register={register}
      rules={{ name: `${prefix}Country`, validation: { required: "Country is required", minLength: { value: 2, message: "Must be at least 2 characters" } } }}
      errors={errors}
    />
    <InputField
      type="email"
      placeholder="Email *"
      register={register}
      rules={{
        name: `${prefix}Email`,
        validation: {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format",
          },
        },
      }}
      errors={errors}
    />
    <InputField
      type="number"
      placeholder="Phone *"
      register={register}
      rules={{
        name: `${prefix}Phone`,
        validation: {
          required: "Mobile number is required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Invalid mobile number format",
          },
        },
      }}
      errors={errors}
    />
  </div>
);
export default AddressForm