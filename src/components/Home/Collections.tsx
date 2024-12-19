import React from "react";
import { GoArrowRight } from "react-icons/go";

const Collections = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto m-20 max-2xl:px-10">
        <div className="top my-10">
          <h1 className="font-medium text-3xl ">Shop Collections</h1>
        </div>
        <div className="flex  gap-5   ">
          <div className="relative">
            <div className="absolute bottom-0 p-14 flex flex-col gap-2">
              <h1 className="text-3xl font-medium">Headband</h1>
              <button className="flex  items-center border-b border-black justify-between w-fit gap-2 hover:scale-105 transition-all duration-300 ">
                <span>Collection</span>
                <span className="mt-1.5 ">
                  <GoArrowRight />
                </span>
              </button>
            </div>
            <img src="/collection1.png" alt="collection" className="" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="relative">
              <div className="absolute bottom-0 p-14 flex flex-col gap-2">
                <h1 className="text-3xl font-medium">Earbuds</h1>
                <button className="flex  items-center border-b border-black justify-between w-fit gap-2 hover:scale-105 transition-all duration-300 ">
                  <span>Collection</span>
                  <span className="mt-1.5 ">
                    <GoArrowRight />
                  </span>
                </button>
              </div>
              <img src="/collection2.png" alt="collection.png" className="" />
            </div>
            <div className="relative">
              <div className="absolute bottom-0 p-14 flex flex-col gap-3">
                <h1 className="text-3xl font-medium">Accessories</h1>
                <button className="flex  items-center border-b border-black justify-between w-fit gap-2 hover:scale-105 transition-all duration-300 ">
                  <span>Collection</span>
                  <span className="mt-1.5 ">
                    <GoArrowRight />
                  </span>
                </button>
              </div>
              <img src="/collection3.png" alt="collection.png" className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
