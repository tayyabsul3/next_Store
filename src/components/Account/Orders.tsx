import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]); // State for orders
  const [loading, setLoading] = useState(false);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:4000/orders/myOrders",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOrders(data.orders || []); // Set orders data or an empty array if no data is returned
    } catch (e) {
      console.error("Error fetching orders:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Render status badge based on order status

  return (
    <div className="Orders w-full flex flex-col gap-10">
      <h1 className="font-semibold text-xl">Orders History</h1>

      <div className="table flex-1 mt-6">
        {!loading ? (
          <>
            {/* Table Layout (Desktop) */}
            <div className="hidden lg:block">
              <Table className="full my-5 rounded-md">
                <TableCaption>
                  {orders.length === 0 ? "No Orders Found" : ""}
                </TableCaption>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="border-b-2 border-gray-400 text-sm">
                      Order ID
                    </TableHead>
                    <TableHead className="border-b-2 p-2 border-gray-400 text-sm">
                      Date
                    </TableHead>
                    <TableHead className="border-b-2 border-gray-400 text-sm">
                      Status
                    </TableHead>
                    <TableHead className="border-b-2 border-gray-400 text-sm">
                      Price
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="border-gray-400 text-sm">
                        {order._id}
                      </TableCell>
                      <TableCell className="border-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="border-gray-400 text-sm">
                        <p
                          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
                          ${
                            order.orderStatus === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.orderStatus === "Canceled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.orderStatus}
                        </p>
                      </TableCell>
                      <TableCell className="border-gray-400 text-sm">
                        ${order.totalPrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Grid Layout (Mobile and Tablet) */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 text-wrap break-words gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-md p-4 shadow-md bg-white"
                >
                  <h3 className="font-semibold text-lg">
                    Order ID: {order._id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    {" "}
                    <p
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
                          ${
                            order.orderStatus === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.orderStatus === "Canceled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                    >
                      {order.orderStatus}
                    </p>
                  </div>
                  <p className="mt-4 font-semibold text-lg">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex p-20 justify-center items-center">
            <p className="animate-spin">
              <Loader2 />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
