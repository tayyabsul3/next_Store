import React from "react";

const Address = () => {
  return (
    <div className="Adresses w-full flex flex-col gap-10">
      <h1>
        <h1 className="font-semibold text-xl">Address</h1>
      </h1>
      <div className="flex gap-5 flex-wrap">
        <div className="space-y-2 border border-black p-5 rounded-md">
          <div className="top flex justify-between font-semibold ">
            <h1 className=" ">Billing Address</h1>
            <button className="text-gray-400 underline text-sm">Edit</button>
          </div>
          <div className="details">
            <p>Sofia Havertz</p>
            <p>(+1) 234 567 890</p>
            <p>345 Long Island , NewYork , United States</p>
          </div>
        </div>
        <div className="space-y-2 border border-black p-5 rounded-md">
          <div className="top flex justify-between font-semibold ">
            <h1 className=" ">Shipping Address</h1>
            <button className="text-gray-400 underline text-sm">Edit</button>
          </div>
          <div className="details">
            <p>Sofia Havertz</p>
            <p>(+1) 234 567 890</p>
            <p>345 Long Island , NewYork , United States</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
