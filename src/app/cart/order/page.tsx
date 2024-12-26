"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { updateProductData } from "@/redux/slices/product";
import { toast } from "sonner";
import { createOrder } from "@/redux/slices/order";

const page = () => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector((state) => state.product);
  const [Error, setError] = useState("");
  const { orders } = useAppSelector((state) => state.order);
  const [order, setorder] = useState({});

  const [cartItems, setcartItems] = useState(cart);

  const newOrder = async () => {
    const data = localStorage.getItem("order");
    if (!data) return;
    try {
      const response = await axios.post(
        "http://localhost:4000/orders/new",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        createOrder({
          data: response.data.order,
        })
      );

      dispatch(
        updateProductData({
          cart: [],
        })
      );
      setorder(response.data.orders);
      toast.success("order has been created");
      console.log(response.data);
    } catch (e: any) {
      toast.error(e.response.data.message);
      setError(e.response.data.message);
      console.error("Error:", e);
    } finally {
      localStorage.removeItem("order");
    }
  };

  useEffect(() => {
    newOrder();
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-7xl mt-20 max-2xl:px-5">
        {!Error ? (
          <div className="md:p-20 py-40  flex-col gap-2 flex justify-center items-center m-20 max-w-5xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 font-semibold">
              Thank you for buying 🎉
            </p>
            <h1 className="text-3xl md:text-5xl max-w-md mt-2 font-medium text-center ">
              Your order has been received
            </h1>
            {/* <div className="items mt-10  flex gap-10 flex-wrap my-5"> */}
            {/* {cartItems.map((item, i) => (
                <div className="item relative" key={i}>
                  <img src={item.thumbnail} alt="" className="w-20" />
                  <p className="absolute -top-2 font-semibold -right-2 text-sm w-6 h-6 flex justify-center items-center bg-black text-white rounded-full">
                    {item.quantity}
                  </p>
                </div>
              ))} */}
            {/* </div> */}
            <div className="details space-y-2 mt-5">
              {/* {cartItems.map((item, i) => (
                <div className="row text-gray-400 font-bold  flex" key={i}>
                  <h1 className="w-40">Order Date:</h1>
                  <p className="text-black ">{item._id}</p>
                </div>
              ))} */}
            </div>
            <div className="space-x-5">
              <Link href={"/"}>
                <button className="rounded-full bg-black px-5 p-2 text-white  md:mt-10">
                  Shop More
                </button>
              </Link>
              {/* <Link href={"/"}>
                <button className="rounded-full bg-black px-5 p-3 text-white mt-10">
                  Purchase history
                </button>
              </Link> */}
            </div>
          </div>
        ) : (
          <div className="p-20  flex-col gap-2 flex justify-center items-center m-20 max-w-5xl mx-auto">
            <h1 className="text-red">{Error}</h1>
            <Link href={"/"}>
              <button className="rounded-full bg-black px-5 p-3 text-white mt-10">
                Try again
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
