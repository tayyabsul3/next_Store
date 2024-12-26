"use client";
import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import NewsLetter from "../Home/NewsLetter";
import { Product } from "@/types/product";
// import ReactStars from "react-rating-stars-component";
import ReactStars from "react-stars";
import { toast } from "sonner";
import axios from "axios";
const SubSection = ({ data }: { data: Product }) => {
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

  const [review, setreview] = useState({
    comment: "",
    rating: 0,
    date: new Date(),
  });

  function ratingChanged(item: any) {
    setreview((prev: any) => {
      return { ...prev, rating: item };
    });
  }

  const handleChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setreview((prev: any) => {
      return {
        ...prev,
        comment: e.target.value,
      };
    });
  };

  const handlesubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/products/review",
        {
          productId: data._id,
          comment: review.comment,
          rating: review.rating,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert(response.data.message);
      setreview({
        comment: "",
        rating: 0,
        date: new Date(),
      });
      toast.success("Review submitted successfully!");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-ful">
      <div className="max-w-7xl mx-auto mt-10 px-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-medium">Customer Reviews</h1>
          <div className="noofReviws flex justify-between items-center">
            <h1>{data.reviews.length} Reviews</h1>
            <button className="border-2 w-60 rounded-lg border-black p-3 py-2 flex justify-between items-center">
              <h1 className="font-medium">All Reviews</h1>
              <div className="mt-1">
                <MdKeyboardArrowRight size={15} />
              </div>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-medium">Submit your review</h1>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              value={review.rating}
              size={24}
            />

            <div className="comment">
              <div className="input">
                <textarea
                  placeholder="Your comment ..."
                  value={review.comment}
                  onChange={(e) => handleChnage(e)}
                  className="border-2 w-full p-3 rounded-md border-black text-sm"
                />
              </div>
              <button
                onClick={handlesubmit}
                className="bg-black text-white mt-3  rounded-md p-2 font-medium px-5"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="revews flex flex-col gap-5 mb-10">
            {data.reviews.map((item, index) => (
              <div className="reviews flex gap-5 py-10 border-b " key={index}>
                <img
                  src="/product2.png"
                  alt="Profile"
                  className="w-14 h-fit rounded-full"
                />
                <div className="space-y-3">
                  <h1 className="text-xl font-medium">{item.reviewerName}</h1>
                  {RatingStars(item.rating)}
                  <p className="">{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <center className="mb-20">
            <button className="border-2 mt-10 p-2 px-5 font-medium rounded-full border-black text-sm mx-auto  ">
              Show more
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default SubSection;
