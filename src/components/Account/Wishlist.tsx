import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removefromwishlist } from "@/redux/slices/user";
import { CgClose } from "react-icons/cg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WishListCard from "./WishListCard";
import { addtocart } from "@/redux/slices/product";

const Wishlist = () => {
  const { wishlist: w } = useAppSelector((state) => state.user);
  const [wishlist, setWishlist] = useState(w);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setWishlist(w);
  }, [w]);

  return (
    <div className="Wishlist w-full flex flex-col gap-10">
      <h2 className="font-semibold text-xl">My Wishlist</h2>

      {/* Table Layout for Larger Screens */}
      <div className=" flex-1 mt-6 hidden lg:block">
        <Table className="full my-5 rounded-md">
          <TableCaption>
            {wishlist.length === 0 ? "No items in your wishlist" : ""}
          </TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="border-b-2 border-gray-400 text-sm">
                Product
              </TableHead>
              <TableHead className="border-b-2 p-2 border-gray-400 text-sm">
                Price
              </TableHead>
              <TableHead className="border-b-2 border-gray-400 text-sm">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {wishlist.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="border-gray-400 text-sm flex items-center gap-4">
                  <button
                    onClick={() => {
                      dispatch(removefromwishlist({ id: item._id }));
                    }}
                    className="font-bold text-gray-500"
                  >
                    <CgClose />
                  </button>
                  <img
                    src={item.thumbnail}
                    alt="productImage"
                    className="w-20"
                  />
                  <div className="space-y-1">
                    <h1 className="font-medium text-lg">{item.title}</h1>
                    <h2 className="text-sm text-gray-400 font-semibold">
                      <span>Color : </span>
                      <span>Black</span>
                    </h2>
                  </div>
                </TableCell>
                <TableCell className="border-gray-400 text-sm">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell className="border-gray-400 text-sm">
                  <button
                    onClick={() => {
                      dispatch(
                        addtocart({
                          item: item,
                        })
                      );
                    }}
                    className="bg-black text-white p-1 px-4 rounded-md hover:bg-black/90"
                  >
                    Add to Cart
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Grid Layout for Mobile and Tablet */}
      <div className="lg:hidden grid grid-cols-1 max-w-[300px] gap-4">
        {wishlist.map((item, i) => (
          <div key={i} className="border rounded-md p-4 shadow-md bg-white">
            <button
              onClick={() => {
                dispatch(removefromwishlist({ id: item.id }));
              }}
              className="font-bold text-gray-500 absolute top-2 right-2"
            >
              <CgClose />
            </button>
            <img
              src={item.thumbnail}
              alt="productImage"
              className="w-full h-40 object-cover"
            />
            <div className="space-y-1 mt-4">
              <h1 className="font-medium text-lg">{item.title}</h1>
              <h2 className="text-sm text-gray-400 font-semibold">
                <span>Color: </span>
                <span>Black</span>
              </h2>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <p className="font-semibold">${item.price.toFixed(2)}</p>
              <button className="bg-black text-white p-2 rounded-md hover:bg-black/90">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
