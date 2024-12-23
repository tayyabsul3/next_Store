import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[100dvh] w-full bg-[url('/hero.png')] bg-top bg-cover ">
      <div className="max-w-4xl mx-auto flex  justify-center  md:justify-end   items-center h-full ">
        <div className=" max-w-md  sm:ml-60 p-5  ">
          <h1 className="text-4xl 2xl:text-5xl font-bold">
            Listen to the <span className="text-blue-500">amazing</span> music
            sound
          </h1>
          <p className="my-2">Experience music like never before</p>

          <Link href={"/shop"}>
            <button className="bg-black text-white p-3  px-5 mt-2 rounded-md hover:bg-black/90 active:bg-black">
              Shopping Now
            </button>
          </Link>
        </div>
      </div>
      {/* <Image src={"./hero.png"} alt="hero" width={90vh} height={100} /> */}
    </div>
  );
};

export default Hero;
