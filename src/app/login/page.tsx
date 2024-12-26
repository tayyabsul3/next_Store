import React from "react";
import LoginForm from "./LoginForm";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex  h-[100vh]">
      <Link href={"/"} className="absolute top-0 p-10">
        <button className="hover:scale-110 transition-all duration-300">
          <HomeIcon />
        </button>
      </Link>
      <div className="max-md:hidden w-full">
        <img src="/auth.png" alt="AuthPng" className=" h-full   object-cover" />
      </div>
      <div className=" lg:p-20 flex w-full   items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
