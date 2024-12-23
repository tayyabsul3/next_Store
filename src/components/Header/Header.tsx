"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { LuUserCircle } from "react-icons/lu";
import { PiHandbagLight, PiUserList } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import Cart from "./Cart";
import { IoIosMenu } from "react-icons/io";
import axios from "axios";
import { toast } from "sonner";
import { getUserData } from "../Reusables/Functions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Authenticate } from "@/redux/slices/user";
import MobileHeader from "./MobileHeader";
import { updateState } from "@/redux/slices/states";

const Header = () => {
  const pathname = usePathname();
  const shouldHideHeader =
    pathname.includes("login") ||
    pathname.includes("register") ||
    pathname.includes("forgot") ||
    pathname.includes("reset");

  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const router = useRouter(); // Added useRouter hook for redirection

  // Logout function
  async function logoutUser() {
    try {
      const { data } = await axios.get("http://localhost:4000/users/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Logged out successfully");
      dispatch(Authenticate({ auth: false, user: {} }));
      router.push("/"); // Redirect to homepage after logout
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  useEffect(() => {
    getUserData(dispatch);
  }, [dispatch]);

  return (
    <div>
      {shouldHideHeader ? (
        ""
      ) : (
        <header className="absolute top-0 w-full bg-transparent ">
          <div className="flex p-5 justify-between items-center max-w-7xl mx-auto">
            <Link href={"/"} className="font-bold text-2xl">
              3legant.
            </Link>
            <nav className="max-md:hidden">
              <ul className="flex flex-1 text-sm font-medium gap-5">
                <Link href={"/"}>Home</Link>
                <Link href={"/shop"}>Shop</Link>
                <Link href={"/cart"}>Cart</Link>
                <Link href={"/contact"}>Contact Us</Link>
                <Link href={"/login"}>Login</Link>
                <Link href={"/register"}>Register</Link>
                <button onClick={logoutUser}>Logout</button>
              </ul>
            </nav>
            <div className="flex gap-2 max-md:hidden items-center">
              <button>
                <CiSearch size={17} />
              </button>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <span className="mt-1">
                      <PiUserList size={22} />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-1 w-fit">
                    <PopoverClose className="border-b border-transparent hover:border-black transition-all duration-100 px-5 p-1">
                      <Link href={"/account"}>My Account</Link>
                    </PopoverClose>
                    <PopoverClose className="border-b border-transparent hover:border-black transition-all duration-100 px-5 p-1">
                      {isAuthenticated ? (
                        <button onClick={logoutUser}>Logout</button>
                      ) : (
                        <Link href={"/login"}>Login</Link>
                      )}
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              </div>
              <Cart />
            </div>
            <div className="mobileheader md:hidden">
              <MobileHeader />
              <button
                onClick={() => {
                  dispatch(
                    updateState({
                      mobileheader: true,
                    })
                  );
                }}
              >
                <IoIosMenu size={25} />
              </button>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
