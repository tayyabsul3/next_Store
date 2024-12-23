import React from "react";
import LoginForm from "./LoginForm";

const page = () => {
  return (
    <div className="flex  h-[100vh]">
      <div className="max-md:hidden h-full">
        <img src="/auth.png" alt="AuthPng" className=" h-full   object-cover" />
      </div>
      <div className=" lg:p-20 flex w-full   items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
