import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { SlLock } from "react-icons/sl";
const Features = () => {
  const features = [
    {
      icon: <CiDeliveryTruck size={30} />,
      facility: "Free Shipping",
      description: "Order above $200",
    },
    {
      icon: <CiMoneyBill size={30} />,
      facility: "Money-back",
      description: "30 days guarantee",
    },
    {
      icon: <SlLock size={30} />,
      facility: "Secure Payments",
      description: "Secured by Stripe",
    },
    {
      icon: <IoCallOutline size={30} />,
      facility: "24/7 Support",
      description: "Phone and Email support",
    },
  ];
  return (
    <div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2  lg:flex gap-5  justify-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-50 p-10 max-2xl:p-5 rounded-lg space-y-3 w-full"
          >
            {feature.icon}
            <h1 className="font-semibold text-xl 2xl:text-2xl">
              {feature.facility}
            </h1>
            <p className="text-sm text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
