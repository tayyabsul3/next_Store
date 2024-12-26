import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Hero = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-20 relative ">
        <div className="h-[50vh]">
          <img
            src="/shopHero.png"
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div
          className="content  w-full  absolute left-[50%] space-y-5 text-center top-[50%] "
          style={{
            transform: "translate(-50%,-50%)",
          }}
        >
          <div className="breadcrumb flex  text-xs w-fit mx-auto items-center">
            <Link href={"/"}>Home</Link>
            <div className="mt-1">
              <MdKeyboardArrowRight size={15} />
            </div>
            <h1 className="font-medium text-sm ml-2">Shop</h1>
          </div>
          <div className="texts">
            <h1 className="text-5xl font-bold mb-5">Shop Page</h1>
            <p>Buy whatever you want at discounted prices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
