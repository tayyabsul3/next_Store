"use client";
import React from "react";
import { PiInstagramLogoLight } from "react-icons/pi";
import { SlSocialFacebook } from "react-icons/sl";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const shouldHideFooter =
    pathname.includes("login") ||
    pathname.includes("register") ||
    pathname.includes("forgot") ||
    pathname.includes("reset");

  return (
    <div>
      {shouldHideFooter ? (
        ""
      ) : (
        <div className="bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto py-10 max-2xl:px-10 ">
            <div className="top flex justify-between  flex-wrap gap-10 border-b py-10 border-gray-700">
              <div className="flex items-center flex-wrap gap-5">
                <h1 className="text-3xl font-semibold md:border-r border-gray-500 pr-10 mr-10">
                  3legant.
                </h1>
                <p className="text-gray-300 text-sm">Ecommerce Store</p>
              </div>
              <div className="flex gap-x-5 gap-y-5 flex-wrap text-gray-300 text-sm ">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/product">Product</Link>
                <Link href="/blogs">Blog</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>
            <div className="bottom py-5 flex justify-between ">
              <div className="flex gap-10 items-center flex-wrap-reverse ">
                <p className="text-sm">
                  Copyright © 2023 3legant. All rights reserved
                </p>
                <div className="space-x-10">
                  <a href="#" className="font-semibold text-sm ">
                    Privacy Policy
                  </a>
                  <a href="#" className="font-semibold text-sm ">
                    Terms of Use
                  </a>
                </div>
              </div>
              <div className=" flex gap-2  ">
                <PiInstagramLogoLight size={20} />
                <SlSocialFacebook size={20} />
                <PiYoutubeLogoLight size={20} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
