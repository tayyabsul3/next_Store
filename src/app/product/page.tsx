import NewsLetter from "@/components/Home/NewsLetter";
import ProductDetails from "@/components/Product/ProductDetails";
import SubSection from "@/components/Product/SubSection";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl mt-20">
        <ProductDetails />
        {/* <SubSection /> */}
      </div>
      <NewsLetter />
    </div>
  );
};

export default Page;
