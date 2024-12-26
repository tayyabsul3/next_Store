import React from "react";
import SignupForm from "./SignupForm";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

const page = () => {
  return (
    <div className="flex  h-[100vh]">
      <Link href={"/"} className="absolute top-0 p-10">
        <button className="hover:scale-110 transition-all duration-300">
          <HomeIcon />
        </button>
      </Link>
      <div className="max-md:hidden h-full">
        <img src="/auth.png" alt="AuthPng" className=" h-full   object-cover" />
      </div>
      <div className="lg:p-20 flex  items-center">
        <SignupForm />
      </div>
    </div>
  );
};

export default page;
