"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../Reusables/ProductCard";
import { Product } from "@/types/product";
import Link from "next/link";

const NewArrivalsProducts = () => {
  const [data, setdata] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:4000/products");
      const d = await res.json();
      const { products } = d;
      setdata(products);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length === 0) return <div>LoadingMain...</div>;

  return (
    <div className="flex  gap-5 overflow-x-auto no_scrollbar  ">
      {data.length > 0 &&
        data &&
        data.map((product, index) => (
          <ProductCard tag="" key={index} product={product} />
        ))}
    </div>
  );
};

export default NewArrivalsProducts;
