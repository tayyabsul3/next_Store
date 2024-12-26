"use client";
import axios from "axios";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import { Image, Plus, Search } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

import { supabase } from "@/lib/supabase";

type ProductFormData = {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  images: any[]; // This will store the selected image files
  thumbnail: number; // Index of the selected thumbnail
};

const AddProductManage = ({ setDoFetching }: { setDoFetching: any }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    category: "",
    images: [], // Initially empty
    thumbnail: -1, // No thumbnail selected initially
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);

      const compressedFiles: File[] = [];
      for (const file of fileArray) {
        const compressedFile = await compressFile(file);
        compressedFiles.push(compressedFile);
      }

      setFormData((prevData) => ({
        ...prevData,
        images: compressedFiles,
      }));
    }
  };

  // Compress the file if it exceeds 500KB
  const compressFile = async (file: File) => {
    const fileSizeInMB = file.size / 1024 / 1024; // Convert size to MB
    if (fileSizeInMB > 0.5) {
      const options = {
        maxSizeMB: 0.5, // Compress to 500 KB
        maxWidthOrHeight: 1024, // Resize if necessary
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
      } catch (error) {
        console.error(`Error compressing ${file.name}:`, error);
        return file;
      }
    } else {
      return file;
    }
  };

  // Handle upload logic
  const handleUpload = async (filesToUpload: File[]) => {
    setLoading(true);
    try {
      const uploadedFileUrls: string[] = [];

      for (const file of filesToUpload) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from("pictures")
          .upload(fileName, file);

        if (error) {
          throw new Error(error.message);
        }

        const { data: d } = supabase.storage
          .from("pictures")
          .getPublicUrl(fileName);
        uploadedFileUrls.push(d.publicUrl!);
      }

      return uploadedFileUrls;
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files");
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = (index: number) => {
    setFormData({
      ...formData,
      thumbnail: index,
    });
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: updatedImages,
      };
    });
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
    if (formData.images.length === 0)
      newErrors.push("At least one image is required.");
    if (formData.thumbnail === -1)
      newErrors.push("You must select a thumbnail image.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Compress the images before uploading
      const uploadedUrls = await handleUpload(formData.images);

      // Product data with image URLs and selected thumbnail
      const productData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        discountPercentage: formData.discountPercentage,
        images: uploadedUrls,
        thumbnail: uploadedUrls[formData.thumbnail], // Thumbnail URL
      };

      // Send the product data to your backend
      const response = await axios.post(
        "http://localhost:4000/products",
        productData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      toast.success("Product created successfully!");
      setFormData({
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        category: "",
        images: [],
        thumbnail: -1,
      });
    } catch (error: any) {
      console.log(error);
      alert("Error creating product");
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
      images: [],
      thumbnail: -1,
    });
    setErrors([]);
  };

  const dialogclose = useRef<any>();
  const InputImagesRef = useRef<any>();

  return (
    <div className=" bg-white ">
      <h1 className="font-semibold text-xl mb-4">Add New Product</h1>

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
          {/* Title Input */}
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
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            />
          </div>

          {/* Description Input */}
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
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              rows={4}
              required
            />
          </div>

          {/* Price and Discount Inputs */}
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
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
                min="0"
                step="any"
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPercentage: Number(e.target.value),
                  })
                }
                className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
                min="0"
                max="100"
                required
              />
            </div>
          </div>

          {/* Category Input */}
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
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            />
          </div>

          {/* Image Input */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Product Images
            </label>
            <input
              type="file"
              ref={InputImagesRef}
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 hidden p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            />
            <div
              onClick={() => {
                InputImagesRef.current.click();
              }}
              className="mt-1 text-gray-400 flex gap-1 px-10 justify-center items-center cursor-pointer bg-gray-200 p-2 w-fit border border-gray-300 text-sm outline-none rounded-md"
            >
              <button className="font-normal">Add</button>
              <button>+</button>
            </div>
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
                    className="absolute top-0 right-0 bg-red-500 min-h-7 min-w-fit text-white text-xs p-1 px-3 m-1 rounded-full"
                    onClick={() => handleImageRemove(index)}
                  >
                    x
                  </button>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-blue-500 min-h-2 min-w-10 text-white text-xs p-1 px-5 m-1 rounded-full"
                    onClick={() => handleThumbnailChange(index)}
                  >
                    {formData.thumbnail === index ? "✓" : "Set Thumbnail"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit & Cancel Buttons */}
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
            {loading ? "Creating..." : "Create Product"}
          </button>
          <DialogClose ref={dialogclose} />
        </div>
      </form>
    </div>
  );
};

export default AddProductManage;
