import React from "react";
import ProductCard from "../Reusables/ProductCard";
import { Product } from "@/types/product";
import NewArrivalsProducts from "./NewArrivalsProducts";

const NewArrivals = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto m-20 max-2xl:px-10">
        <div className="top my-10">
          <h1 className="font-medium text-3xl ">New Arrivals</h1>
        </div>
        <NewArrivalsProducts />
      </div>
    </div>
  );
};

export default NewArrivals;
