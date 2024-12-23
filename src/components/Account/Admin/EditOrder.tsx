"use client";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

type OrderFormData = {
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    phoneNo: string;
  };
  orderStatus: string;
  subtotal: number;
  shipping: number;
  tax: number;
  totalPrice: number;
  images: FileList | null;
  thumbnail: number | null;
};

const EditOrderManage = ({
  orderData,
  setDoFetching,
}: {
  orderData: any;
  setDoFetching: any;
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    shippingInfo: {
      address: orderData.shippingInfo.address,
      city: orderData.shippingInfo.city,
      state: orderData.shippingInfo.state,
      country: orderData.shippingInfo.country,
      phoneNo: orderData.shippingInfo.phoneNo,
    },
    orderStatus: orderData.orderStatus,
    subtotal: orderData.subtotal,
    shipping: orderData.shipping,
    tax: orderData.tax,
    totalPrice: orderData.totalPrice,
    images: null,
    thumbnail: null,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize form with the current order data
  useEffect(() => {
    setFormData({
      shippingInfo: {
        address: orderData.shippingInfo.address,
        city: orderData.shippingInfo.city,
        state: orderData.shippingInfo.state,
        country: orderData.shippingInfo.country,
        phoneNo: orderData.shippingInfo.phoneNo,
      },
      orderStatus: orderData.orderStatus,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      totalPrice: orderData.totalPrice,
      images: null,
      thumbnail: null,
    });
  }, [orderData]);

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name.startsWith("shippingInfo.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        shippingInfo: {
          ...formData.shippingInfo,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Helper function to upload images (can be reused)
  const uploadImage = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "NextEcommerce");
      formData.append("cloud_name", "dvgw1jv0x");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvgw1jv0x/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);

    const newErrors: string[] = [];
    if (!formData.shippingInfo.address) newErrors.push("Address is required.");
    if (!formData.shippingInfo.city) newErrors.push("City is required.");
    if (!formData.shippingInfo.state) newErrors.push("State is required.");
    if (!formData.shippingInfo.country) newErrors.push("Country is required.");
    if (!formData.shippingInfo.phoneNo)
      newErrors.push("Phone number is required.");
    if (!formData.orderStatus) newErrors.push("Order status is required.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      newErrors.map((err) => toast.error(err));
      return;
    }

    try {
      setLoading(true);

      // Assuming you are updating the order
      const updatedOrderData = {
        // shippingInfo: formData.shippingInfo,
        status: formData.orderStatus,
        // subtotal: formData.subtotal,
        // shipping: formData.shipping,
        // tax: formData.tax,
        // totalPrice: formData.totalPrice,
      };

      const response = await axios.put(
        `http://localhost:4000/orders/${orderData._id}`, // Updated to orders endpoint
        updatedOrderData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Order updated successfully!");

      setFormData({
        shippingInfo: {
          address: "",
          city: "",
          state: "",
          country: "",
          phoneNo: "",
        },
        orderStatus: "",
        subtotal: 0,
        shipping: 0,
        tax: 0,
        totalPrice: 0,
        images: null,
        thumbnail: null,
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      dialogclose.current.click();
      setDoFetching(Math.random().toString());
    }
  };

  const handleCancel = () => {
    setFormData({
      shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        phoneNo: "",
      },
      orderStatus: "",
      subtotal: 0,
      shipping: 0,
      tax: 0,
      totalPrice: 0,
      images: null,
      thumbnail: null,
    });
    setErrors([]);
  };

  const dialogclose = useRef<any>();

  return (
    <div className="bg-white">
      <h1 className="font-semibold text-xl mb-4">Edit Order</h1>

      {errors.length > 0 && (
        <div className="mb-4">
          <ul className="list-disc pl-5 text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Shipping Information Section */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>

            <label
              htmlFor="shippingInfo.address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="shippingInfo.address"
              name="shippingInfo.address"
              value={formData.shippingInfo.address}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="shippingInfo.city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="shippingInfo.city"
                name="shippingInfo.city"
                value={formData.shippingInfo.city}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
                required
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="shippingInfo.state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="shippingInfo.state"
                name="shippingInfo.state"
                value={formData.shippingInfo.state}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="shippingInfo.country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="shippingInfo.country"
                name="shippingInfo.country"
                value={formData.shippingInfo.country}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
                required
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="shippingInfo.phoneNo"
                className="block text-sm font-medium text-gray-700"
              >
                Phone No
              </label>
              <input
                type="text"
                id="shippingInfo.phoneNo"
                name="shippingInfo.phoneNo"
                value={formData.shippingInfo.phoneNo}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
                required
              />
            </div>
          </div> */}

          {/* Order Status Section */}
          <div>
            <label
              htmlFor="orderStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Order Status
            </label>
            <select
              id="orderStatus"
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>

          {/* You can include the other order information like subtotal, shipping, tax, total price if needed */}

          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 ${
                loading ? "bg-gray-400" : "bg-green-500"
              } text-white rounded-md`}
            >
              {loading ? "Updating..." : "Update Order"}
            </button>
            <DialogClose ref={dialogclose} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOrderManage;
