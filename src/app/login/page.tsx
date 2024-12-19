import React from "react";
import LoginForm from "./LoginForm";

const page = () => {
  return (
    <div className="flex  h-[100vh]">
      <img src="/auth.png" alt="AuthPng" className="  object-cover" />
      <div className="p-20 flex w-full   items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
