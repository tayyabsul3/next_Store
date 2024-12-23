"use client";
import Address from "@/components/Account/Address";
import Product from "@/components/Account/Admin/Product";
import Details from "@/components/Account/Details";
import Orders from "@/components/Account/Orders";
import Wishlist from "@/components/Account/Wishlist";
import { useAppSelector } from "@/redux/hooks";
import React, { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Order from "@/components/Account/Admin/Order";
import User from "@/components/Account/Admin/User";
const page = () => {
  const [activebtn, setactivebtn] = useState(0);
  const [activebtnadmin, setactivebtnadmin] = useState<number>(10);
  const [Role, setRole] = useState("");
  const { user } = useAppSelector((state) => state.user);

  const buttons = [
    "My Account",
    "My Orders",
    "My Wishlist",
    "My Address",
    "My Products",
  ];
  const adminbuttons = ["Product", "Order history", "User settings"];

  useEffect(() => {
    setRole(user.role);
    console.log("role", Role);
  }, [user]);
  return (
    <div>
      <div className="mx-auto max-w-7xl mt-20   max-2xl:px-5 ">
        <div className="flex gap-10 mb-20 pt-10 max-md:flex-col     ">
          <div className="account-nav max-md:hidden   h-full bg-gray-200 p-10 rounded-md">
            <img
              src="/blog.png"
              alt="Avatart"
              className=" mx-auto rounded-full h-20 w-20"
            />
            <h2 className="font-bold text-center mt-2">{user.name}</h2>
            <div className=" w-60 mt-10  flex flex-col gap-5">
              {buttons.map((btn, i) => (
                <Fragment key={i}>
                  {btn.toLowerCase() === "my products" && Role === "admin" ? (
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
                        <AccordionTrigger
                          className={
                            i === activebtn
                              ? "text-sm pt-0 pb-0 mt-0 mb-0 text-left font-semibold  no-underline hover:no-underline  w-full"
                              : "text-sm pt-0 pb-0 mt-0 mb-0 text-gray-400 text-left no-underline  hover:no-underline font-medium   w-full"
                          }
                        >
                          <button
                            className={
                              i === activebtn
                                ? "text-sm text-left font-semibold pb-2  border-b border-black w-full"
                                : "text-sm text-gray-400 text-left font-medium pb-2   w-full"
                            }
                          >
                            {btn}
                          </button>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-5 space-y-2 py-2">
                            {adminbuttons.map((abtn, index) => (
                              <button
                                onClick={() => {
                                  setactivebtn(i);
                                  setactivebtnadmin(index);
                                }}
                                key={index}
                                className={
                                  index === activebtnadmin
                                    ? "text-sm text-left font-semibold pb-2   w-full"
                                    : "text-sm text-gray-400 text-left font-medium pb-2   w-full"
                                }
                              >
                                {abtn}
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    i !== 4 && (
                      <button
                        onClick={() => {
                          setactivebtn(i);
                        }}
                        className={
                          i === activebtn
                            ? "text-sm text-left font-semibold pb-2  border-b border-black w-full"
                            : "text-sm text-gray-400 text-left font-medium pb-2   w-full"
                        }
                      >
                        {btn}
                      </button>
                    )
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="account-nav items-center md:hidden gap-5 max-sm:flex-col  flex h-full bg-gray-200 p-10 rounded-md">
            <div className="flex-1">
              <img
                src="/blog.png"
                alt="Avatart"
                className=" mx-auto rounded-full h-20 w-20"
              />
              <h2 className="font-bold text-center mt-2">{user.name}</h2>
            </div>
            <div className="   flex flex-1 flex-wrap  gap-5">
              {buttons.map((btn, i) => (
                <Fragment key={i}>
                  {btn.toLowerCase() === "my products" && Role === "admin" ? (
                    <Accordion
                      type="single"
                      collapsible
                      className=" h-fit mt-0 mb-0 pt-0 w-full
                         pb-0 "
                    >
                      <AccordionItem
                        value="item-1"
                        className=" h-fit mt-0 mb-0 pt-0 w-full
                         pb-0 "
                      >
                        <AccordionTrigger
                          className={
                            i === activebtn
                              ? "text-sm pt-0   pb-0 mt-0 mb-0 text-left font-semibold  no-underline hover:no-underline  w-full"
                              : "text-sm pt-0   pb-0 mt-0 mb-0 text-gray-400 text-left no-underline  hover:no-underline font-medium   w-full"
                          }
                        >
                          <button
                            className={
                              i === activebtn
                                ? "text-sm text-left font-semibold pb-2  border-b border-black w-full"
                                : "text-sm text-gray-400 text-left font-medium pb-2   w-full"
                            }
                          >
                            {btn}
                          </button>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-5 space-y-2 py-2">
                            {adminbuttons.map((abtn, index) => (
                              <button
                                onClick={() => {
                                  setactivebtn(i);
                                  setactivebtnadmin(index);
                                }}
                                key={index}
                                className={
                                  index === activebtnadmin
                                    ? "text-sm text-left font-semibold pb-2   w-full"
                                    : "text-sm text-gray-400 text-left font-medium pb-2   w-full"
                                }
                              >
                                {abtn}
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    i !== 4 && (
                      <button
                        onClick={() => {
                          setactivebtn(i);
                        }}
                        className={
                          i === activebtn
                            ? "text-sm text-left font-semibold pb-2  border-b border-black w-full"
                            : "text-sm text-gray-400 text-left font-medium pb-2   w-full"
                        }
                      >
                        {btn}
                      </button>
                    )
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="w-full">
            <h1 className="pb-10   text-3xl font-medium">My Account</h1>
            {activebtn === 0 && <Details />}
            {activebtn === 1 && <Orders />}
            {activebtn === 2 && <Wishlist />}
            {activebtn === 3 && <Address />}
            {activebtn === 4 && activebtnadmin === 0 && <Product />}
            {activebtn === 4 && activebtnadmin === 1 && <Order />}
            {activebtn === 4 && activebtnadmin === 2 && <User />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
