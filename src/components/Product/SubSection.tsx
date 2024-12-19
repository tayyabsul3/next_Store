import React from "react";
import { IoStar } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import NewsLetter from "../Home/NewsLetter";
import { Product } from "@/types/product";

const SubSection = ({ data }: { data: Product }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    <div className="w-ful">
      <div className="max-w-7xl mx-auto mt-10 px-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-medium">Customer Reviews</h1>
          <div className="noofReviws flex justify-between">
            <h1>{data.reviews.length} Reviews</h1>
            <button className="border-2 w-60 rounded-lg border-black p-3 py-2 flex justify-between items-center">
              <h1 className="font-medium">All Reviews</h1>
              <div className="mt-1">
                <MdKeyboardArrowRight size={15} />
              </div>
            </button>
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
