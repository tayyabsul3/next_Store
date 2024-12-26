import Link from "next/link";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";

const Aboutus = () => {
  return (
    <div>
      <div className="breadcrumb space-x-2 flex  text-xs  items-center">
        <Link href={"/"}>Home</Link>
        <div className="pt-0.5 font-thin text-gray-400">
          <MdKeyboardArrowRight size={13} />
        </div>
        <h1>Contact us</h1>
      </div>
      <div className="info flex flex-col gap-2 mt-5 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-medium ">
          We believe in sustainable decor. We’re passionate about life at home.
        </h1>
        <p>
          Our features timeless furniture, with natural fabrics, curved lines,
          plenty of mirrors and classic design, which can be incorporated into
          any decor project. The pieces enchant for their sobriety, to last for
          generations, faithful to the shapes of each period, with a touch of
          the present
        </p>
      </div>
      <div className="my-20 flex max-md:flex-col bg-gray-50">
        <div className="min-w-[50%]">
          <img
            src="/aboutus.png"
            alt="ABoutuspng"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text p-8 sm:p-20 flex flex-col justify-center items-center w-full">
          <div className="w-fit mx-auto ">
            <h1 className="text-2xl sm:text-4xl font-medium mb-4">About Us</h1>
            <p className="mt-2 max-w-sm max-sm:text-sm">
              3legant is a gift & decorations store based in HCMC, Vietnam. Est
              since 2019.
            </p>
            <p className="mt-2 max-w-sm max-sm:text-sm">
              Our customer service is always prepared to support you 24/7
            </p>
            <button className="flex mt-4  items-center border-b border-black justify-between w-fit gap-2 hover:scale-105 transition-all duration-300 ">
              <span>Shop Now</span>
              <span className="mt-1.5 ">
                <GoArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
