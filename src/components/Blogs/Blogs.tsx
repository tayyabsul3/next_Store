import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from "../Reusables/ProductCard";
import NewsLetter from "../Home/NewsLetter";
import Blog from "./Blog";

const Blogs = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  return (
    <div>
      <div className="max-w-7xl mx-auto m-20">
        <div className="space-y-10">
          <div className="flex gap-5 items-center">
            <h1 className="text- pb-2 border-black border-b p-1 font-medium">
              All Blogs
            </h1>
            <h1 className="text-gray-500 pb-2  p-1 font-medium">Featured</h1>
          </div>
          <div className="productsGrid grid grid-cols-4 gap-10">
            {arr.map((item, index) => (
              <Blog key={index} />
            ))}
          </div>
          <center>
            <button className="border-2 mt-10 p-2 px-5 font-medium rounded-full border-black text-sm mx-auto  ">
              Show more
            </button>
          </center>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Blogs;
