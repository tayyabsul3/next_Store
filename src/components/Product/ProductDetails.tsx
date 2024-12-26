"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { addtocart, updateQuantity } from "@/redux/slices/product";
import { useAppDispatch } from "@/redux/hooks";
import { addtowishlist } from "@/redux/slices/user";

const ProductDetails = ({ data: apidata }: any) => {
  const [data, setdata] = useState({ ...apidata, quantity: 1 });
  function calculateOriginalPrice(
    discountedPrice: number,
    discountPercentage: number
  ) {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error("Discount percentage must be between 0 and 100");
    }

    const originalPrice = discountedPrice / (1 - discountPercentage / 100);

    return originalPrice.toFixed(2);
  }
  const rating = data.rating;

  const dispatch = useAppDispatch();
  const filledStars = Math.floor(rating); // Full stars
  const emptyStars = 5 - Math.floor(rating);

  useEffect(() => {}, [apidata]);
  return (
    <div>
      <div className="breadcrumbs ">
        <div className="breadcrumb space-x-2 flex  text-xs  items-center">
          <Link href={"/"}>Home</Link>
          <div className="pt-0.5 font-thin text-gray-400">
            <MdKeyboardArrowRight size={13} />
          </div>
          <h1>Product</h1>
          <div className=" pt-0.5 font-thin text-gray-400">
            <MdKeyboardArrowRight size={13} />
          </div>
          <h1>{data.category}</h1>
          <div className=" pt-0.5 font-thin text-gray-400">
            <MdKeyboardArrowRight size={13} />
          </div>
          <h1 className="">{data.title}</h1>
        </div>
        <div className="productDetails mt-5 w-full flex items-start gap-10 ">
          <div className="images flex-[0.5]  ">
            <div className="bg-gray-100 ">
              <center>
                <img src={data.thumbnail} alt="product1" className="" />
              </center>
            </div>
            <div className="mt-5 gap-5 flex items-center ">
              {data.images &&
                data.images.map((img: string, i: number) => (
                  <div className="bg-gray-100 h-32  " key={i}>
                    <img
                      src={img}
                      alt="productImage"
                      className="w-[7.5rem] h-full object-contain"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex-[0.5]">
            <div className="ratings flex gap-2 items-center">
              <div className="flex">
                {[...Array(filledStars)].map((_, index) => (
                  <IoStar key={index} />
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                  <IoStar key={index} color="lightgray" />
                ))}
              </div>
              <div className="flex">
                <h1>{data.reviews.length} Reviews</h1>
              </div>
            </div>
            <div className="detailsofProduct flex flex-col gap-5 mt-5 ">
              <h1 className="text-4xl font-medium">{data.title}</h1>
              <p>{data.description}</p>
              <div className="price flex gap-2 items-center">
                <h1 className="font-medium text-2xl ">${data.price}</h1>
                <p className="font-medium line-through text-gray-400 text-lg">
                  ${calculateOriginalPrice(data.price, data.discountPercentage)}
                </p>
              </div>
            </div>
            <div className="divider h-px my-8 w-full bg-gray-300"></div>
            {/* <div className="offerExpiryDate flex gap-5 flex-col">
              <h1>Offer Expires in</h1>
              <div>Timer Here</div>
            </div> */}
            {/* <div className="divider h-px my-8 w-full bg-gray-300"></div> */}
            {/* <div className="measurements flex flex-col gap-1">
              <h1 className="m ">Measurements</h1>
              <p className="text-xl font-medium"></p>
            </div> */}
            <div className="lastsection flex gap-5 mt-8">
              <div className="qty flex items-center bg-gray-50 rounded-md w-fit  flex-auto gap-5">
                <button
                  onClick={() => {
                    if (data.quantity > 1) {
                      setdata((prevData: any) => ({
                        ...prevData,
                        quantity: prevData.quantity - 1,
                      }));
                    }
                  }}
                  className="px-8"
                >
                  <FiMinus />
                </button>
                <p className="font-medium text-xl">{data.quantity}</p>
                <button
                  onClick={() => {
                    setdata((prevData: any) => ({
                      ...prevData,
                      quantity: prevData.quantity + 1,
                    }));
                  }}
                  className="px-8"
                >
                  <FiPlus />
                </button>
              </div>
              <button
                onClick={() => {
                  dispatch(
                    addtowishlist({
                      product: data,
                    })
                  );
                }}
                className="addtowishlist p-3 flex-auto border-2 rounded-md px-5  w-full flex items-center border-black gap-2 active:bg-gray-950/10 justify-center"
              >
                <GoHeart size={20} />
                <span className="text-xl">Wishlist</span>
              </button>
            </div>
            <button
              onClick={() => {
                dispatch(addtocart({ item: data }));
                setdata((prevData: any) => ({ ...prevData, quantity: 1 }));
                console.log("data", data);
              }}
              className="bg-black   text-white  p-4   opacity-100  transition-all duration-300 w-full mt-5 rounded-md hover:bg-black/90 text-xl"
            >
              Add to cart
            </button>
            <div className="extras mt-8 flex flex-col gap-2 text-sm ">
              <div className="flex gap-10">
                <h1 className="flex-[0.1]">id #</h1>
                <p className="flex-[0.9]">{data.id}</p>
              </div>
              <div className="flex gap-10">
                <h1 className="flex-[0.1]">Category</h1>
                <p className="flex-[0.9]">{data.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
