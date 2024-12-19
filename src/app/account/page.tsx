"use client";
import Address from "@/components/Account/Address";
import Details from "@/components/Account/Details";
import Orders from "@/components/Account/Orders";
import Wishlist from "@/components/Account/Wishlist";
import React, { useState } from "react";

const page = () => {
  const [activebtn, setactivebtn] = useState(0);

  const buttons = ["My Account", "My Orders", "My Wishlist", "My Address"];
  return (
    <div>
      <div className="mx-auto max-w-7xl mt-20 ">
        <div className="flex gap-10 mb-20 pt-10  ">
          <div className="account-nav h-full bg-gray-200 p-10 rounded-md">
            <img
              src="/blog.png"
              alt="Avatart"
              className=" mx-auto rounded-full h-20 w-20"
            />
            <h2 className="font-bold text-center mt-2">Tayyab Sultan</h2>
            <div className=" w-60 my-20  flex flex-col gap-5">
              {buttons.map((btn, i) => (
                <button
                  onClick={() => {
                    setactivebtn(i);
                  }}
                  key={i}
                  className={
                    i === activebtn
                      ? "text-sm text-left font-semibold pb-2  border-b border-black w-full"
                      : "text-sm text-gray-400 text-left font-medium pb-2   w-full"
                  }
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <h1 className="pb-10   text-3xl font-medium">My Account</h1>
            {activebtn === 0 && <Details />}
            {activebtn === 1 && <Orders />}
            {activebtn === 2 && <Wishlist />}
            {activebtn === 3 && <Address />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
