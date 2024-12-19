import React from "react";
import { CiMail } from "react-icons/ci";
import SignupNewsLetter from "../Reusables/SignupNewsLetter";

const NewsLetter = () => {
  return (
    <div className="relative w-full max-lg:h-[40vh] bg-red-400 ">
      <div className="w-full h-full">
        <img
          src="/newsletter.png"
          alt=""
          className="w-full h-full object-cover "
        />
      </div>
      <div
        className="w-fit absolute left-[50%] top-[50%] flex flex-col justify-center items-center"
        style={{
          transform: "translate(-50%,-50%)",
        }}
      >
        <h1 className="text-2xl lg:text-4xl font-semibold">
          Join Our Newsletter
        </h1>
        <p className="mb-5 mt-2 text-wrap">
          Sign up for deals, new products and promotions
        </p>
        <div className="border-b flex border-black items-center gap-2 sm:gap-5 p-2 ">
          <div className="flex justify-center items-center mt-1">
            <CiMail />
          </div>
          <SignupNewsLetter />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
