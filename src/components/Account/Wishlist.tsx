import React from "react";
import { CgClose, CgRemove } from "react-icons/cg";
import WishListCard from "./WishListCard";

const Wishlist = () => {
  return (
    <div className="Orders w-full flex flex-col gap-10">
      <h2>
        <h2 className="font-semibold text-xl">My Wishlist</h2>
      </h2>
      <div className="table flex-1">
        <div
          className="headder flex w-full p-1
             justify-between  pb-4 pt-0 border-gray-500 border-b "
        >
          <h2 className="font-semibold text-gray-500  w-auto">Product</h2>
          <h2 className="font-semibold text-gray-500  w-auto">Price</h2>
          <h2 className="font-semibold text-gray-500  w-auto">Action</h2>
        </div>

        <WishListCard />
      </div>
    </div>
  );
};

export default Wishlist;
