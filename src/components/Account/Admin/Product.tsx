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
import EditProductManage from "./EditProduct";

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [doFetching, setDoFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchquery, setsearchquery] = useState("");
  const [ProducttoEdit, setProducttoEdit] = useState({});

  const dialogRef = useRef<any>();
  const dialogRef3 = useRef<any>();

  // Fetch the products list from the server
  const fetchProducts = async (url: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        url ? url : "http://localhost:4000/products",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProducts(data.products);
      console.log("fasfaf", data.products[0]);
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  };

  // Call fetch products when the component mounts or when doFetching changes
  useEffect(() => {
    fetchProducts(``);
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
      <div className="flex justify-between max-lg:flex-col  mb-4 gap-5">
        <div className="flex  justify-between items-center w-full">
          <h1 className="font-semibold text-xl">All Products</h1>
          <button
            onClick={() => dialogRef.current.click()}
            className="flex gap-1 lg:hidden p-2 text-sm text-gray-50 bg-green-500 rounded-md font-semibold"
          >
            <span>Add Product</span>
            <span>+</span>
          </button>
        </div>
        <div className="flex gap-2 w-full items-center">
          <form
            onSubmit={getProduct}
            className="seacrh flex max-lg:w-full bg-gray-50 text-gray-800 items-center px-2 rounded-md"
          >
            <input
              type="search"
              placeholder="Search by  title"
              onChange={(e) => setsearchquery(e.target.value)}
              className="bg-transparent w-full text-sm lg:min-w-[200px] p-2 border-none outline-none"
            />
            <Search size={15} />
          </form>
          <button
            onClick={() => dialogRef.current.click()}
            className="lg:flex gap-1 hidden whitespace-nowrap  p-2 text-sm text-gray-50 bg-green-500 rounded-md font-semibold"
          >
            <span>Add Product</span>
            <span>+</span>
          </button>
        </div>
      </div>

      {/* Responsive Table Layout (default for smaller screens) */}
      <div className="productsTable mb-6 max-lg:hidden">
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
                  <TableCell className="border-gray-400 text-sm flex">
                    <button
                      onClick={() => {
                        setProducttoEdit(product);
                        dialogRef3.current.click();
                      }}
                      className="p-1 text-sm hover:underline rounded-sm hover:text-black text-gray-400 font-semibold px-3 bg-gray-200"
                    >
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

      {/* Responsive Grid Layout (for large screens) */}
      <div className="productsGrid lg:hidden grid grid-cols-1  gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-md shadow-lg bg-white flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">{product.title}</h2>
                <span className="text-lg text-gray-500">${product.price}</span>
              </div>
              <p className="text-sm text-gray-500">ID: {product._id}</p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => {
                    setProducttoEdit(product);
                    dialogRef3.current.click();
                  }}
                  className="p-1 text-sm hover:underline rounded-sm hover:text-black text-gray-400 font-semibold px-3 bg-gray-200"
                >
                  Edit
                </button>
                <button
                  className="p-1 text-sm hover:bg-red-400 bg-red-500 text-gray-50 font-semibold rounded-md mx-2 px-3"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-lg text-gray-500">
            No Products Found
          </div>
        )}
      </div>

      <Dialog>
        <DialogTrigger ref={dialogRef} />
        <DialogContent className="max-h-[80vh] p-10 overflow-auto">
          <AddProductManage setDoFetching={setDoFetching} />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger ref={dialogRef3} />
        <DialogContent className="max-h-[80vh] p-10 overflow-auto">
          <EditProductManage
            setDoFetching={setDoFetching}
            productData={ProducttoEdit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Product;
