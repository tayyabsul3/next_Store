"use client";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from "../Reusables/ProductCard";
import NewsLetter from "../Home/NewsLetter";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Loader2 } from "lucide-react";

const Filter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRating, setSelectedRating] = useState("5 Star");
  const [url, setUrl] = useState("http://localhost:4000/products");

  // Modify the URL based on selected filters
  function urlModifier() {
    let queryString = "";

    if (selectedCategory !== "All") {
      queryString += `category=${selectedCategory.toLowerCase()}`;
    }
    if (selectedPrice !== "All") {
      // Example for Low to High: You might have to modify this depending on your backend
      const priceRange =
        selectedPrice === "Low to High"
          ? "min_price=0&max_price=1000"
          : "min_price=1000&max_price=5000";
      queryString += queryString ? `&${priceRange}` : priceRange;
    }
    if (selectedRating !== "5 Star") {
      queryString += queryString
        ? `&rating=${selectedRating.split(" ")[0]}`
        : `rating=${selectedRating.split(" ")[0]}`;
    }

    return queryString ? `?${queryString}` : "";
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const queryString = urlModifier(); // Get query parameters based on filters
      const res = await fetch(`${url}${queryString}`);
      const data = await res.json();
      setData(data.products); // Assuming the API returns { products: [...] }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, selectedPrice, selectedRating]);
  return (
    <div>
      <div className="max-w-7xl mx-auto my-10 md:m-20 max-2xl:px-5">
        <div className="space-y-10">
          <div className="flex gap-5 items-end flex-wrap">
            <Popover>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold uppercase text-gray-500 text-sm">
                  Categories
                </h1>
                <PopoverTrigger>
                  <button className="border-2 w-fit gap-10 lg:w-60 rounded-md p-3 py-2 flex justify-between items-center">
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
            {/* <Popover>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold uppercase text-gray-500 text-sm">
                  Price
                </h1>
                <PopoverTrigger>
                  <button className="border-2 w-fit gap-10 lg:w-60 rounded-md p-3 py-2 flex justify-between items-center">
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
                  <button className="border-2 w-fit gap-10 lg:w-60 rounded-md p-3 py-2 flex justify-between items-center">
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
            </Popover> */}
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedPrice("All");
                setSelectedRating("5 Star");
              }}
              className="bg-black text-white p-2.5 px-5 rounded-md "
            >
              Reset Filters
            </button>
          </div>
          {loading ? (
            <div className=" flex justify-center items-center h-[50vh]">
              <div className="  w-fit animate-spin h-fit">
                <Loader2 />
              </div>
            </div>
          ) : (
            <div className="productsGrid flex flex-wrap gap-10">
              {data.map((item, index) => (
                <ProductCard tag="new" product={item} key={index} />
              ))}
            </div>
          )}
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
