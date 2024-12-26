"use client";
import React, { useState } from "react";

import { toast } from "sonner";

const ContactUsForm = () => {
  // State variables for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Error state to track validation issues
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes and update state
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation function
  const validateForm = () => {
    let formErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email address is invalid.";
    if (!formData.message) formErrors.message = "Message is required.";

    setErrors(formErrors);

    // Return whether there are validation errors
    return Object.values(formErrors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      // Show success toast with entered values
      toast.info(
        `Form Submitted!        Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`
      );

      // Clear form data after submission (optional)
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="form flex gap-20 flex-col-reverse md:flex-row">
      <form className="flex-1 space-y-5" onSubmit={handleSubmit}>
        <div className="field flex flex-col gap-2">
          <label
            htmlFor="name"
            className="font-semibold uppercase text-sm text-gray-500"
          >
            Full name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`border p-2 px-5 w-full outline-none bg-transparent ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="field flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-semibold uppercase text-sm text-gray-500"
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Your Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`border p-2 px-5 w-full outline-none bg-transparent ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="field flex flex-col gap-2">
          <label
            htmlFor="message"
            className="font-semibold uppercase text-sm text-gray-500"
          >
            Message
          </label>
          <textarea
            rows={5}
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`border resize-none p-2 pt-3 px-5 w-full outline-none bg-transparent ${
              errors.message ? "border-red-500" : ""
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <div className="field flex flex-col gap-2">
          <button
            type="submit"
            className="bg-black text-white p-2 opacity-100 transition-all duration-300 w-fit rounded-md hover:bg-black/90 px-5"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="flex-1 flex justify-center items-center h-full w-full">
        <img src="/contactus.avif" alt="Contact Us" />
      </div>
    </div>
  );
};

export default ContactUsForm;
