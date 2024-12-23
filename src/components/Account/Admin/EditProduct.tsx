"use client";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

type ProductFormData = {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  stock: number;
  images: FileList | null;
  thumbnail: number | null;
};

const EditProductManage = ({
  productData,
  setDoFetching,
}: {
  productData: any;
  setDoFetching: any;
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: productData.title,
    description: productData.description,
    price: productData.price,
    discountPercentage: productData.discountPercentage,
    category: productData.category,
    stock: productData.stock,
    images: null,
    thumbnail: null,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize form with the current product data
  useEffect(() => {
    setFormData({
      title: productData.title,
      description: productData.description,
      price: productData.price,
      discountPercentage: productData.discountPercentage,
      category: productData.category,
      stock: productData.stock, // Update stock in formData
      images: null,
      thumbnail: null,
    });
  }, [productData]);

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    if (name === "images") {
      setFormData({
        ...formData,
        [name]: files,
      });
    }
  };

  const handleThumbnailChange = (index: number) => {
    setFormData({
      ...formData,
      thumbnail: index,
    });
  };

  // Helper function to upload images and get URLs (can be reused)
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
    if (!formData.title) newErrors.push("Title is required.");
    if (!formData.description) newErrors.push("Description is required.");
    if (formData.price <= 0) newErrors.push("Price must be greater than 0.");
    if (formData.discountPercentage < 0 || formData.discountPercentage > 100)
      newErrors.push("Discount percentage must be between 0 and 100.");
    if (!formData.category) newErrors.push("Category is required.");
    if (formData.stock < 0) newErrors.push("Stock must be a positive number.");
    if (!formData.images || formData.images.length === 0)
      newErrors.push("At least one image is required.");
    if (formData.thumbnail === null)
      newErrors.push("You must select a thumbnail image.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      newErrors.map((err) => toast.error(err));
      return;
    }

    try {
      setLoading(true);

      // Assuming you are updating the product
      const updatedProductData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        discountPercentage: formData.discountPercentage,
        stock: formData.stock, // Include stock in the update
        images:
          "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg",
        thumbnail:
          "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg",
      };

      const response = await axios.patch(
        `http://localhost:4000/products/${productData._id}`,
        updatedProductData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Product updated successfully!");

      dialogclose.current.click();
      setFormData({
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        category: "",
        stock: 0, // Reset stock
        images: null,
        thumbnail: null,
      });
      setDoFetching(Math.random().toString());
    } catch (error) {
      alert("Error updating product");
    } finally {
      setLoading(false);
      setDoFetching("dasda");
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      category: "",
      stock: 0, // Reset stock
      images: null,
      thumbnail: null,
    });
    setErrors([]);
  };

  const dialogclose = useRef<any>();

  return (
    <div className="bg-white">
      <h1 className="font-semibold text-xl mb-4">Edit Product</h1>

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
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              rows={4}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
                min="0"
                required
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium text-gray-700"
              >
                Discount Percentage
              </label>
              <input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
                min="0"
                max="100"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            />
          </div>

          {/* New stock input field */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              min="0"
              required
            />
          </div>

          {/* Image preview and file input remains the same */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Product Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleFileChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
            />
          </div>

          {/* Image Preview */}
          {formData.images && formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {Array.from(formData.images).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`product-image-${index}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-blue-500 min-h-2 min-w-10 text-white text-xs p-1 px-5 m-1 rounded-full"
                    onClick={() => handleThumbnailChange(index)}
                  >
                    {formData.thumbnail === index ? "✓" : "Set Thumbnail"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

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
            {loading ? "Updating..." : "Update Product"}
          </button>
          <DialogClose ref={dialogclose} />
        </div>
      </form>
    </div>
  );
};

export default EditProductManage;
