"use client";
import { useAppDispatch } from "@/redux/hooks";
import { removefromcart, updateQuantity } from "@/redux/slices/product";
import { Product } from "@/types/product";
import React, { useState } from "react";

const Cart = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="row flex items-center pb-10 border-b   justify-between">
      <div className="col1 flex items-center   gap-4 md:w-60 ">
        <img src={item.thumbnail} alt="productImage" className="w-20" />
        <div className="space-y-1">
          <h1 className="font-medium text-lg ">{item.title}</h1>
          <h2 className="text-sm text-gray-400 font-semibold">
            <span>Color : </span>
            <span>Black</span>
          </h2>
          <button
            className="font-bold text-gray-500 "
            onClick={() => {
              dispatch(removefromcart({ id: item._id }));
            }}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="col2">
        <div className="border mt-1 p-1 px-3 rounded-lg border-black flex gap-5 items-center w-fit ">
          <button
            onClick={() => {
              dispatch(updateQuantity({ id: item._id, type: "decrease" }));
            }}
          >
            -
          </button>
          <p className="font-medium ">{item.quantity}</p>
          <button
            onClick={() => {
              dispatch(updateQuantity({ id: item._id, type: "increase" }));
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="col3 max-md:hidden">
        <p>${item.price}</p>
      </div>
      <div className="col4 max-md:hidden font-semibold text-lg">
        <h1>${(item.price * item.quantity).toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default Cart;
