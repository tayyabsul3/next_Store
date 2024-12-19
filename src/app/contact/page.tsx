import Aboutus from "@/components/Contact/Aboutus";
import Contactus from "@/components/Contact/Contactus";
import Features from "@/components/Home/Features";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl mt-20">
        <Aboutus />
        <Contactus />
      </div>
      <div className="bg-gray-50 mt-20 py-10  ">
        <Features />
      </div>
    </div>
  );
};

export default page;
