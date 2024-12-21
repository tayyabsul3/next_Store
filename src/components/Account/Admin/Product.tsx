import axios from "axios";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddProductManage from "./AddProduct";

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [doFetching, setDoFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchquery, setsearchquery] = useState("");

  const dialogRef = useRef<any>();

  // Fetch the products list from the server
  const fetchProducts = async (url: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        url ? url : "http://localhost:4000/products?page=1",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProducts(data.products);
      console.log("fasfaf");
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  };

  // Call fetch products when the component mounts or when doFetching changes
  useEffect(() => {
    fetchProducts(``);
    console.log("fasfaf");
  }, [doFetching]);

  // Handle product deletion
  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:4000/products/${productId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // After deleting, re-fetch the products list
      setDoFetching(!doFetching);
    } catch (e) {
      console.error("Error deleting product:", e);
    }
  };

  function getProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchProducts(`http://localhost:4000/products?keyword=${searchquery}`);
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">All Products</h1>
        <div className="buttons flex gap-2 items-center ">
          <form
            onSubmit={getProduct}
            className="seacrh flex text-gray-800 items-center px-2 rounded-md "
          >
            <input
              type="search"
              placeholder="Search by id or title"
              onChange={(e) => setsearchquery(e.target.value)}
              className="bg-transparent text-sm min-w-[200px] p-2 border-none outline-none"
            />
            <Search size={15} />
          </form>
          <button
            onClick={() => dialogRef.current.click()}
            className="flex gap-1 p-2 text-sm text-gray-50 bg-green-500 rounded-md font-semibold"
          >
            <span>Add Product</span>
            <span>+</span>
          </button>
        </div>
      </div>

      <div className="productsTable">
        {!loading ? (
          <Table className="full my-5 rounded-md">
            <TableCaption>
              {products.length === 0 ? "No Products Found" : ""}
            </TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="border-b-2 border-gray-400 text-sm">
                  Id
                </TableHead>
                <TableHead className="border-b-2 p-2 border-gray-400 text-sm">
                  Title
                </TableHead>
                <TableHead className="border-b-2 border-gray-400 text-sm">
                  Price
                </TableHead>
                <TableHead className="border-b-2 border-gray-400 text-sm">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="border-gray-400 text-sm">
                    {product._id}
                  </TableCell>
                  <TableCell className="border-gray-400 text-sm p-5">
                    {product.title}
                  </TableCell>
                  <TableCell className="border-gray-400 text-sm">
                    ${product.price}
                  </TableCell>
                  <TableCell className="border-gray-400 text-sm">
                    <button className="p-1 text-sm hover:underline rounded-sm hover:text-black text-gray-400 font-semibold px-3 bg-gray-200 ">
                      Edit
                    </button>
                    <button
                      className="p-1 text-sm hover:bg-red-400 bg-red-500 text-gray-50 font-semibold rounded-md mx-2 px-3"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex p-20 justify-center items-center">
            <p className="animate-spin">
              <Loader2 />
            </p>
          </div>
        )}
      </div>

      <Dialog>
        <DialogTrigger ref={dialogRef} />
        <DialogContent className="max-h-[80vh] p-10 overflow-auto">
          <AddProductManage setDoFetching={setDoFetching} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Product;
