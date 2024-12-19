import React from "react";

const Promotion = () => {
  return (
    <div className="flex bg-[#febc39] items-center ">
      <div className="flex-[0.5] h-full">
        <img
          src="/promotion.png"
          alt="promtionpic"
          className="h-full w-full object-cover  "
        />
      </div>
      <div className="bg-[#febc39] w-full flex-[0.5] flex flex-col gap-5 justify-center p-10 lg:p-20 min-h-full">
        <p className="font-bold text-sm text-blue-500">PROMOTION</p>
        <h1 className="text-4xl font-semibold">Hurry up! 40% OFF</h1>
        <p>Thousands of high tech are waiting for you</p>
        <div className="flex flex-col gap-2">
          <p>Offer expires in:</p>
          <p>TimerHere</p>
          <button className="bg-black w-fit    text-white p-3 px-10  transition-all duration-300  mt-2 rounded-md">
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
