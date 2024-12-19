"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removefromcart, updateQuantity } from "@/redux/slices/product";
import { toogleShowCart } from "@/redux/slices/states";
import { Product } from "@/types/product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PiHandbagLight } from "react-icons/pi";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { iscartvisible } = useAppSelector((state) => state.globalState);
  const { cart } = useAppSelector((state) => state.product);

  const CalculateTotalPrice = () => {
    // return cart.reduce((acc, curr) => acc + curr.price, 0);
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  };
  const [cartItems, setcartItems] = useState(cart);

  useEffect(() => {
    setcartItems(cart);
    console.log("cart updated");
    // eslint-disable-next-line
  }, [cart]);
  return (
    <div>
      <button
        className="flex gap-1 items-center"
        onClick={() => {
          dispatch(toogleShowCart({}));
        }}
      >
        <PiHandbagLight size={20} />
        <div className="bg-black w-5 h-5 text-yellow-400 p-1 text-sm text-center rounded-full flex justify-center items-center">
          <p>{cartItems.length}</p>
        </div>
      </button>
      {iscartvisible && (
        <div
          onClick={() => {
            dispatch(toogleShowCart({}));
          }}
          className="overlay bg-black/25 h-[100vh] fixed top-0 right-0 z-10  w-full  "
        ></div>
      )}
      <div
        className={`cart fixed top-0 h-full w-[250px] sm:w-[500px] z-20 right-0 transition-all duration-300 ${
          iscartvisible ? "tranlate-x-0 " : "translate-x-[500px]"
        } p-5 bg-white shadow-2xl`}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Cart</h1>
          <button
            className=""
            onClick={() => {
              dispatch(toogleShowCart({}));
            }}
          >
            <IoMdClose size={25} />
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-5 h-[75%] overflow-auto no_scrollbar">
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item: Product, index: number) => (
              <div className="flex gap-2" key={index}>
                <div className="w-24 flex justify-center items-center bg-gray-200">
                  <img
                    src={item.images[0]}
                    alt="item"
                    className="w-full h-full object-contain "
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between font-bold w-full">
                    <h2 className=" ">{item.title}</h2>
                    <p>${item.price * item.quantity}</p>
                  </div>
                  <div className="flex justify-between  w-full">
                    <h2 className=" ">Color : Black</h2>
                    <button
                      onClick={() => {
                        console.log(item);
                        dispatch(removefromcart({ id: item._id }));
                      }}
                    >
                      <IoMdClose size={20} color="gray" />
                    </button>
                  </div>
                  <div className="border-2 mt-1 p-1 px-3 rounded-lg border-black flex gap-5 items-center w-fit ">
                    <button
                      onClick={() => {
                        dispatch(
                          updateQuantity({ id: item._id, type: "decrease" })
                        );
                      }}
                    >
                      -
                    </button>
                    <p className="font-medium ">{item.quantity}</p>
                    <button
                      onClick={() => {
                        console.log("clicked", item._id);

                        dispatch(
                          updateQuantity({ id: item._id, type: "increase" })
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="total py-2 space-y-2  ">
          <div className="sub flex justify-between text-sm ">
            <h1>Subtotal</h1>
            <p>${CalculateTotalPrice().toFixed(2)}</p>
          </div>
          <div className=" flex justify-between border-t text-lg font-medium ">
            <h1>Total</h1>
            <p>${CalculateTotalPrice().toFixed(2)}</p>
          </div>
          <Link href={"/cart"}>
            <button className="bg-black   text-white  p-3  opacity-100  transition-all duration-300 w-full mt-2 rounded-md">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
