"use client";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from "../Reusables/ProductCard";
import NewsLetter from "../Home/NewsLetter";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

const Filter = () => {
  const [data, setdata] = useState([]);

  function urlModifier() {
    let string = "";
    if (selectedCategory !== "All") {
      string += "category=" + selectedCategory.toLowerCase();
    }
    // if (selectedPrice!== "All") {
    //   string += "&min_price=" + selectedPrice * 100;
    //   string += "&max_price=" + (selectedPrice + 1) * 100;
    // }
    return;
  }
  const fetchData = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/products/?category=beauty"
      );
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

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRating, setSelectedRating] = useState("5 Star");
  const [url, seturl] = useState("http://localhost:4000/products");
  return (
    <div>
      <div className="max-w-7xl mx-auto m-20 max-2xl:px-10">
        <div className="space-y-10">
          <div className="flex gap-5 items-center">
            <Popover>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold uppercase text-gray-500 text-sm">
                  Categories
                </h1>
                <PopoverTrigger>
                  <button className="border-2 w-60 rounded-md p-3 py-2 flex justify-between items-center">
                    <h1>{selectedCategory}</h1>
                    <div className="mt-1">
                      <MdKeyboardArrowRight size={15} />
                    </div>
                  </button>
                </PopoverTrigger>
              </div>
              <PopoverContent>
                <div>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1  border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedCategory("Beauty")}
                    >
                      Beauty
                    </div>
                  </PopoverClose>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1 border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedCategory("Fragrance")}
                    >
                      Fragrance
                    </div>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold uppercase text-gray-500 text-sm">
                  Price
                </h1>
                <PopoverTrigger>
                  <button className="border-2 w-60 rounded-md p-3 py-2 flex justify-between items-center">
                    <h1>{selectedPrice}</h1>
                    <div className="mt-1">
                      <MdKeyboardArrowRight size={15} />
                    </div>
                  </button>
                </PopoverTrigger>
              </div>
              <PopoverContent>
                <div>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1 border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedPrice("Low to High")}
                    >
                      Low to high
                    </div>
                  </PopoverClose>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1 border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedPrice("High to Low")}
                    >
                      High to Low
                    </div>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold uppercase text-gray-500 text-sm">
                  Rating
                </h1>
                <PopoverTrigger>
                  <button className="border-2 w-60 rounded-md p-3 py-2 flex justify-between items-center">
                    <h1>{selectedRating}</h1>
                    <div className="mt-1">
                      <MdKeyboardArrowRight size={15} />
                    </div>
                  </button>
                </PopoverTrigger>
              </div>

              <PopoverContent>
                <div>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1 border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedRating("4 Star")}
                    >
                      4 Star
                    </div>
                  </PopoverClose>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1 border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedRating("3 Star")}
                    >
                      3 Star
                    </div>
                  </PopoverClose>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1 border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedRating("2 Star")}
                    >
                      2 Star
                    </div>
                  </PopoverClose>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1 border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedRating("1 Star")}
                    >
                      1 Star
                    </div>
                  </PopoverClose>
                  <PopoverClose className="w-full text-left">
                    <div
                      className="mb-1 border-b hover:border-black pb-1 cursor-pointer border-transparent"
                      onClick={() => setSelectedRating("0 Star")}
                    >
                      0 Star
                    </div>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="productsGrid flex flex-wrap justify-center gap-10">
            {data.map((item, index) => (
              <ProductCard tag="new" product={item} key={index} />
            ))}
          </div>
          <center>
            <button className="border-2 mt-10 p-2 px-5 font-medium rounded-full border-black text-sm mx-auto  ">
              Show more
            </button>
          </center>
        </div>
        <div className="options"></div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Filter;
