import React from "react";
import { CiDeliveryTruck, CiMail, CiMoneyBill, CiShop } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { SlLock } from "react-icons/sl";

const Contactus = () => {
  const features = [
    {
      icon: <CiShop size={40} />,
      facility: "Address",
      description: "234 Hai Trieu, Ho Chi Minh City, Viet Nam",
    },

    {
      icon: <IoCallOutline size={40} />,
      facility: "Contact US",
      description: "+84 234 567 890",
    },
    {
      icon: <CiMail size={40} />,
      facility: "EMAIL",
      description: "hello@gmail.com",
    },
  ];
  return (
    <div>
      <h1 className="text-4xl font-medium mb-4 text-center">Contact Us</h1>
      <div>
        <div className="max-w-7xl mx-auto m-20 flex gap-5 justify-center items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-10 rounded-lg space-y-2 w-full flex justify-center flex-col items-center"
            >
              {feature.icon}
              <h1 className="font-semibold text-2xl">{feature.facility}</h1>
              <p className=" text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="form flex gap-20  ">
        <form className="flex-1 space-y-5 ">
          <div className="field flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold uppercase text-sm  text-gray-500"
            >
              Full name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 px-5 w-full outline-none bg-transparent"
            />
          </div>
          <div className="field flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold uppercase text-sm  text-gray-500"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Your Email Address"
              className="border p-2 px-5 w-full outline-none bg-transparent"
            />
          </div>
          <div className="field flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold uppercase text-sm  text-gray-500"
            >
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Your Message"
              className="border resize-none  p-2 pt-3 px-5 w-full outline-none bg-transparent"
            />
          </div>
          <div className="field flex flex-col gap-2">
            <button className="bg-black   text-white  p-2   opacity-100  transition-all duration-300 w-fit  rounded-md hover:bg-black/90 px-5">
              {" "}
              Submit
            </button>
          </div>
        </form>
        <div className="flex-1  flex justify-center items-center h-full w-full">
          <img src="/contactus.avif" alt="hgjkg" />
        </div>
      </div>
    </div>
  );
};

export default Contactus;
