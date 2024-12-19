import React from "react";
import ProductCard from "../Reusables/ProductCard";
import NewArrivalsProducts from "./NewArrivalsProducts";

const TopSellers = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto m-20 max-2xl:px-10">
        <div className="top my-10">
          <h1 className="font-medium text-3xl ">Top Sellers</h1>
        </div>
        <div className="flex flex-wrap  gap-5   ">
          <NewArrivalsProducts />
        </div>
      </div>
    </div>
  );
};

export default TopSellers;
