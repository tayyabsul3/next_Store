import React from "react";
import OrderRow from "./OrderRow";

const Orders = () => {
  return (
    <div className="Orders w-full flex flex-col gap-10">
      <h1>
        <h1 className="font-semibold text-xl">Orders History</h1>
      </h1>
      <div className="table flex-1">
        <div
          className="headder flex w-full p-1
     justify-between  pb-4 pt-0 border-gray-500 border-b "
        >
          <h1 className="font-semibold text-gray-500  flex-[0.25] text-left">
            Number ID
          </h1>
          <h1 className="font-semibold text-gray-500  flex-[0.25] text-left">
            Dates
          </h1>
          <h1 className="font-semibold text-gray-500  flex-[0.25] text-left">
            Status
          </h1>
          <h1 className="font-semibold text-gray-500  flex-[0.25] text-left">
            Price
          </h1>
        </div>
        <OrderRow />
      </div>
    </div>
  );
};

export default Orders;
