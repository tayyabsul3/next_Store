"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addtocart } from "@/redux/slices/product";
import { addtowishlist } from "@/redux/slices/user";
import { Product } from "@/types/product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import { useSelector } from "react-redux";

type Props = {
  tag: string;
  product: Product;
};
const ProductCard = ({ tag, product }: Props) => {
  if (!product) {
    return <div>Loading...</div>;
  }
  const dispatch = useAppDispatch();
  const RatingStars = (rating: number) => {
    // Determine the number of full and empty stars
    const filledStars = Math.floor(rating); // Full stars
    const emptyStars = 5 - filledStars; // Empty stars

    return (
      <div className="flex">
        {/* Full stars */}
        {[...Array(filledStars)].map((_, index) => (
          <IoStar key={index} />
        ))}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <IoStar key={index + filledStars} color="lightgray" />
        ))}
      </div>
    );
  };

  return (
    <div className="card font-medium flex-grow-0 text-sm space-y-2 group w-fit cursor-pointer">
      <div className="card-image relative flex justify-center items-center bg-gray-200 h-[300px] w-[250px]">
        <img
          src={product.images[0]}
          alt="Product Image"
          className=" w-full h-full object-contain"
        />

        <div className="absolute top-0 p-4 h-full flex flex-col w-full items-center justify-between transition-all duration-300 group-hover:bg-gray-500/5">
          <div className="flex w-full  items-center justify-between">
            <div className="tag bg-white text-sm p-0.5 font-bold px-2 rounded-sm ">
              <h1>{tag ? tag : "New"}</h1>
            </div>
            <button
              onClick={() => {
                dispatch(
                  addtowishlist({
                    product: {
                      ...product,
                      quantity: 1,
                    },
                  })
                );
                console.log(product);
              }}
              className={` rounded-full  p-1 focus:bg-black focus:text-white bg-white text-black shadow-lg`}
            >
              <CiHeart />
            </button>
          </div>
          <button
            onClick={() => {
              console.log(product);
              dispatch(
                addtocart({
                  item: { ...product, quantity: 1 },
                })
              );
            }}
            className="bg-black   text-white  group-hover:p-3 opacity-0 group-hover:opacity-100  transition-all duration-300 w-full mt-2 rounded-md"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="card-content cursor-default font-medium space-y-1 ">
        {RatingStars(product.rating)}

        <h3>{product.title} </h3>
        <p>{product.category}</p>
        <p>${product.price}</p>
      </div>
      <Link href={`/products/${product._id}`}>
        <button className="border-black border   text-black p-2  hover:bg-black/5  transition-all duration-300 w-full mt-2 rounded-md">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
