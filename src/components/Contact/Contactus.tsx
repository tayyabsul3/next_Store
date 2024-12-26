import React from "react";
import { CiDeliveryTruck, CiMail, CiMoneyBill, CiShop } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import ContactUsForm from "./ContactUsForm";

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
        <div className="max-w-7xl mx-auto m-20 flex gap-5 flex-col md:flex-row justify-center items-center">
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
      <ContactUsForm />
    </div>
  );
};

export default Contactus;
