"use client";
import React, { useState } from "react";
import { toast } from "sonner";

const SignupNewsLetter = () => {
  const [email, setemail] = useState("");
  const handleSubmit = () => {
    toast.success(email + " noted but Feature Comming soom");
    setemail("");
  };
  return (
    <div className="flex ">
      <input
        type="email"
        placeholder="Enter address"
        className="bg-transparent outline-none lg:min-w-80"
        onChange={(e) => setemail(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="text-gray-600 font-semibold text-sm"
      >
        Signup
      </button>
    </div>
  );
};

export default SignupNewsLetter;
