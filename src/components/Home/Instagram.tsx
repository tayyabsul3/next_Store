import React from "react";

const Instagram = () => {
  const images = [
    "./insta4.png",
    "./insta3.png",
    "./insta2.png",
    "./insta1.png",
  ];
  return (
    <div>
      <div className="max-w-7xl mx-auto m-20 max-2xl:px-10 flex gap-5 flex-col justify-center">
        <div className="flex justify-center items-center flex-col gap-5">
          <p className="font-semibold md:text-lg text-gray-400">NEWSFEED</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            Instagram
          </h1>
          <p className="md:text-lg text-center">
            Follow us in social media for more discount & promotions
          </p>
          <p>@3legant_official</p>
        </div>
        <div className="images grid sm:flex gap-5 md:flex-wrap justify-center mt-5 w-full ">
          {images.map((image, i) => (
            <div className="flex-[0.25]" key={i}>
              <img src={image} alt="image" className=" w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instagram;
