"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removefromwishlist } from "@/redux/slices/user";
import React, { useEffect, useState } from "react";
import { CgClose, CgRemove } from "react-icons/cg";

const WishListCard = () => {
  const { wishlist: w } = useAppSelector((state) => state.user);
  const [wishlist, setwishlist] = useState(w);
  useEffect(() => {
    setwishlist(w);
  }, [w]);
  const dispatch = useAppDispatch();
  return (
    <div className="rows mt-5 p-1   flex flex-col gap-5">
      {wishlist.map((item, i) => (
        <div
          key={i}
          className="row  flex items-center pb-10 border-b   justify-between"
        >
          <div className="col1 flex items-center   gap-4  ">
            <button
              onClick={() => {
                dispatch(
                  removefromwishlist({
                    id: item.id,
                  })
                );
              }}
              className="font-bold text-gray-500 "
            >
              <CgClose />
            </button>
            <img src={item.thumbnail} alt="productImage" className="w-20" />
            <div className="space-y-1">
              <h1 className="font-medium text-lg ">{item.title}</h1>
              <h2 className="text-sm text-gray-400 font-semibold">
                <span>Color : </span>
                <span>Black</span>
              </h2>
            </div>
          </div>

          <div className="col3">
            <p>${item.price.toFixed(2)}</p>
          </div>
          <button className="bg-black   text-white  p-2   opacity-100  transition-all duration-300 w-fit  rounded-md hover:bg-black/90 px-5">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default WishListCard;
