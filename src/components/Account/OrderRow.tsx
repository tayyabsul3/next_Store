"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

const OrderRow = () => {
  const { orders } = useAppSelector((state) => state.order);
  return (
    <div className="rows mt-5 p-1    flex flex-col gap-5">
      {orders.map((item, i) => (
        <div key={i} className="row flex border-b gap-2 pb-4 justify-between">
          <h1 className="text-gray-500 flex-[0.25] ">{item.orderId}</h1>
          <h1 className="text-gray-500 flex-[0.25] ">{item.orderDate}</h1>
          <h1 className="text-gray-500 flex-[0.25] ">{item.orderStatus}</h1>
          <h1 className="text-gray-500 flex-[0.25] ">
            ${item.orderSummary.totalAmount}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default OrderRow;
