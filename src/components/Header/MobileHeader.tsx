"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removefromcart, updateQuantity } from "@/redux/slices/product";
import {
  toogleShowCart,
  toogleShowHeader,
  updateState,
} from "@/redux/slices/states";
import { Product } from "@/types/product";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PiHandbagLight, PiUserList } from "react-icons/pi";
import { AccordionContent, AccordionTrigger } from "../ui/accordion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Authenticate } from "@/redux/slices/user";

const MobileHeader = () => {
  const dispatch = useAppDispatch();
  const { mobileheader } = useAppSelector((state) => state.globalState);
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

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const router = useRouter(); // Added useRouter hook for redirection

  // Logout function
  async function logoutUser() {
    try {
      const { data } = await axios.get("http://localhost:4000/users/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Logged out successfully");
      dispatch(Authenticate({ auth: false, user: {} }));
      router.push("/"); // Redirect to homepage after logout
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  const CalculateSubTotalPrice = () => {
    const cartTotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return cartTotal.toFixed(2);
  };
  return (
    <div>
      {mobileheader && (
        <div
          onClick={() => {
            dispatch(toogleShowHeader({}));
          }}
          className="overlay bg-black/25 h-[100vh] fixed top-0 right-0 z-10  w-full  "
        ></div>
      )}
      {mobileheader && (
        <div
          className={`cart  fixed top-0 h-full w-[90%] sm:w-[500px] z-50 right-0 transition-all duration-300 ${
            mobileheader ? "tranlate-x-0 " : "translate-x-[500px]"
          } p-5 bg-white shadow-2xl`}
        >
          <div className="flex justify-end ">
            <button
              className=""
              onClick={() => {
                dispatch(toogleShowHeader({}));
              }}
            >
              <IoMdClose size={25} />
            </button>
          </div>
          <div className="links flex-col flex gap-5 mt-2">
            <div className="search rounded-lg flex justify-between items-center px-5  bg-gray-50 ">
              <input
                type="search"
                className="bg-transparent w-full outline-none p-2"
                placeholder="Search Product "
              />
              <div className="text-gray-300 ">
                <SearchIcon />
              </div>{" "}
            </div>
            <nav className="">
              <ul className="flex flex-1 text-sm font-medium gap-5">
                <Link
                  href={"/"}
                  onClick={() => {
                    dispatch(toogleShowHeader({}));
                  }}
                >
                  Home
                </Link>
                <Link
                  href={"/shop"}
                  onClick={() => {
                    dispatch(toogleShowHeader({}));
                  }}
                >
                  Shop
                </Link>
                <Link
                  href={"/cart"}
                  onClick={() => {
                    dispatch(toogleShowHeader({}));
                  }}
                >
                  Cart
                </Link>
                <Link
                  href={"/contact"}
                  onClick={() => {
                    dispatch(toogleShowHeader({}));
                  }}
                >
                  Contact
                </Link>
                {/* <Link href={"/login"}>Login</Link>
                <Link href={"/register"}>Register</Link> */}
                {/* <button onClick={logoutUser}>Logout</button> */}
              </ul>
            </nav>
            <Accordion
              type="single"
              collapsible
              className=" h-fit mt-0 mb-0 pt-0
                         pb-0 "
            >
              <AccordionItem
                value="item-1"
                className=" h-fit mt-0 mb-0 pt-0
                         pb-0 "
              >
                <AccordionTrigger className="bg-gray-50 hover:no-underline px-5 rounded-lg p-2 text-gray-500">
                  Cart
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className={`cart transition-all duration-300   bg-white `}
                  >
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
                                      updateQuantity({
                                        id: item._id,
                                        type: "decrease",
                                      })
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
                                      updateQuantity({
                                        id: item._id,
                                        type: "increase",
                                      })
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
                        <p>${CalculateSubTotalPrice()}</p>
                      </div>
                      <div className=" flex justify-between border-t text-lg font-medium ">
                        <h1>Total</h1>
                        <p>${CalculateTotalPrice().toFixed(2)}</p>
                      </div>
                      <Link href={"/cart"}>
                        <button
                          // onClick={handlePayment}
                          className="bg-black   text-white  p-3  opacity-100  transition-all duration-300 w-full mt-2 rounded-md"
                        >
                          Checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion
              type="single"
              collapsible
              className=" h-fit mt-0 mb-0 pt-0
                         pb-0 "
            >
              <AccordionItem
                value="item-1"
                className=" h-fit mt-0 mb-0 pt-0
                         pb-0 "
              >
                <AccordionTrigger className="bg-gray-50 hover:no-underline px-5 rounded-lg p-2 text-gray-500">
                  Account
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className={`cart transition-all duration-300   bg-white `}
                  >
                    <div className="flex flex-col gap-1 w-full bg-gray-50">
                      <button
                        onClick={() => {
                          dispatch(toogleShowHeader({}));
                        }}
                        className="border-b border-transparent w-full hover:border-black transition-all duration-100 p-2 font-medium "
                      >
                        <Link
                          href={"/account"}
                          className="flex  items-center gap-5 bg-gray-50 p-2 w-full"
                        >
                          <span className="mt-1">
                            <PiUserList size={22} />
                          </span>
                          My Account
                        </Link>
                      </button>
                      <div
                        onClick={() => {
                          dispatch(toogleShowHeader({}));
                        }}
                        className="border-b border-transparent hover:border-black font-medium transition-all duration-100 p-2  "
                      >
                        {isAuthenticated ? (
                          <button onClick={logoutUser}>Logout</button>
                        ) : (
                          <Link
                            href={"/login"}
                            className="flex  items-center gap-5 bg-gray-50 p-2 w-full font-medium "
                          >
                            <span className="mt-1">
                              <PiUserList size={22} />
                            </span>
                            Login
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
