import axios from "axios";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditOrderManage from "./EditOrder";
import { toast } from "sonner";

const Order = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [doFetching, setDoFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderToEdit, setOrderToEdit] = useState({});

  const dialogRef = useRef<any>();
  const dialogRef3 = useRef<any>();

  const getOrders = async (url: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        url ? url : "http://localhost:4000/orders/allOrders",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const ordersData = Array.isArray(data.orders)
        ? data.orders
        : [data.orders];

      setOrders(ordersData);
    } catch (e: any) {
      toast.error(e.response.data.message);
      setOrders([]);
      console.error("Error fetching orders:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders(``);
  }, [doFetching]);

  const handleDeleteOrder = async (orderId: string) => {
    const choice = confirm("Are you sure you want to delete" + ` ${orderId}`);
    if (!choice) {
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/orders/${orderId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setDoFetching(!doFetching);
    } catch (e) {
      console.error("Error deleting order:", e);
    }
  };

  function getOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getOrders(`http://localhost:4000/orders/${searchQuery}`);
  }

  return (
    <div>
      <div className="flex justify-between max-sm:flex-col gap-2 sm:items-center">
        <h1 className="font-semibold">All Orders</h1>
        <div className="buttons flex gap-2 items-center">
          <form
            onSubmit={getOrder}
            className="search w-full  flex bg-gray-50 text-gray-800 items-center px-2 rounded-md"
          >
            <input
              type="search"
              placeholder="Search id"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm max-sm:w-full sm:min-w-[250px]  p-2 border-none outline-none"
            />
            <Search size={15} />
          </form>
        </div>
      </div>

      {/* Table View - Visible on smaller screens */}
      <div className="ordersTable max-lg:hidden">
        {!loading ? (
          <table className="table-auto w-full my-5 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b-2 border-gray-400 text-sm">Order ID</th>
                <th className="border-b-2 p-2 border-gray-400 text-sm">
                  Status
                </th>
                <th className="border-b-2 border-gray-400 text-sm">
                  Total Price
                </th>
                <th className="border-b-2 border-gray-400 text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border-gray-400 text-sm text-wrap break-words">
                      {order._id}
                    </td>
                    <td className="border-gray-400 text-sm p-5">
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
                    </td>
                    <td className="border-gray-400 text-sm">
                      ${order.totalPrice}
                    </td>
                    <td className="border-gray-400 text-sm">
                      <button
                        onClick={() => {
                          setOrderToEdit(order);
                          dialogRef3.current.click();
                        }}
                        className="p-1 text-sm hover:underline rounded-sm hover:text-black text-gray-400 font-semibold px-3 bg-gray-200"
                      >
                        Edit
                      </button>
                      <button
                        className="p-1 text-sm hover:bg-red-400 bg-red-500 text-gray-50 font-semibold rounded-md mx-2 px-3"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="flex p-20 justify-center items-center">
            <p className="animate-spin">
              <Loader2 />
            </p>
          </div>
        )}
      </div>

      {/* Grid View - Visible on larger screens (lg and up) */}
      <div className="ordersGrid lg:hidden grid   gap-5 mt-5">
        {!loading ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="orderCard p-5 border rounded-md shadow-sm hover:shadow-md"
            >
              <h2 className="font-semibold text-lg">Order ID: {order._id}</h2>
              <p className="mt-2">
                <span className="font-medium">Status: </span>
                <span
                  className={`${
                    order.orderStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.orderStatus === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.orderStatus === "Canceled"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  } inline-flex items-center px-3 py-1 text-xs font-medium rounded-full`}
                >
                  {order.orderStatus}
                </span>
              </p>
              <p className="mt-2">
                <span className="font-medium">Total Price: </span>$
                {order.totalPrice}
              </p>

              <div className="mt-3 flex  gap-2">
                <button
                  onClick={() => {
                    setOrderToEdit(order);
                    dialogRef3.current.click();
                  }}
                  className="p-2 text-sm text-gray-400 bg-gray-200 rounded-md hover:underline hover:text-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="p-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex p-20 justify-center items-center">
            <p className="animate-spin">
              <Loader2 />
            </p>
          </div>
        )}
      </div>

      {/* Dialog for editing an order */}
      <Dialog>
        <DialogTrigger ref={dialogRef3} />
        <DialogContent className="max-h-[80vh] p-10 overflow-auto">
          <EditOrderManage
            setDoFetching={setDoFetching}
            orderData={orderToEdit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Order;
