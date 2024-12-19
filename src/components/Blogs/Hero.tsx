import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Hero = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-20 relative ">
        <img src="/blogHero.png" alt="" className="w-full " />
        <div
          className="content  absolute left-[50%] space-y-5 text-center top-[50%] "
          style={{
            transform: "translate(-50%,-50%)",
          }}
        >
          <div className="breadcrumb flex  text-xs w-fit mx-auto items-center">
            <Link href={"/"}>Home</Link>
            <div className="mt-1">
              <MdKeyboardArrowRight size={15} />
            </div>
            <h1 className="font-medium text-sm ml-2">Blogs</h1>
          </div>
          <div className="text">
            <h1 className="text-5xl font-bold mb-5">Our Blogs</h1>
            <p>Home ideas and Design Inspiration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
