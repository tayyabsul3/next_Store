import React from "react";
import SignupForm from "./SignupForm";

const page = () => {
  return (
    <div className="flex  h-[100vh]">
      <img src="/auth.png" alt="AuthPng" className="  object-cover" />
      <div className="p-20 flex  items-center">
        <SignupForm />
      </div>
    </div>
  );
};

export default page;
