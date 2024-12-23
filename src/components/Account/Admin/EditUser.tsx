"use client";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

type UserFormData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const EditUserManage = ({
  userData,
  setDoFetching,
}: {
  userData: any;
  setDoFetching: any;
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: userData.name,
    email: userData.email,
    password: "",
    role: userData.role, // Initialize with the user's current role
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize form with the current user data
  useEffect(() => {
    setFormData({
      name: userData.name,
      email: userData.email,
      password: "",
      role: userData.role,
    });
  }, [userData]);

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);

    const newErrors: string[] = [];
    if (!formData.name) newErrors.push("Name is required.");
    if (!formData.email) newErrors.push("Email is required.");
    if (formData.password && formData.password.length < 6)
      newErrors.push("Password must be at least 6 characters.");
    if (!formData.role) newErrors.push("Role is required.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      newErrors.map((err) => toast.error(err));
      return;
    }

    try {
      setLoading(true);

      const updatedUserData = {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined, // Only send password if it's changed
        role: formData.role, // Include role in the update
      };

      const response = await axios.put(
        `http://localhost:4000/users/update/${userData._id}`,
        updatedUserData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("User updated successfully!");
    } catch (error) {
      alert("Error updating user");
    } finally {
      setDoFetching(Math.random().toString());
      dialogclose.current.click();
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user", // Reset to default role (you can choose this or leave it as is)
    });
    setErrors([]);
  };

  const dialogclose = useRef<any>();

  return (
    <div className="bg-white">
      <h1 className="font-semibold text-xl mb-4">Edit User</h1>

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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
              required
            />
          </div>

          {/* <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password (Leave empty to keep current)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
            />
          </div> */}

          {/* Role Selection Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 text-sm outline-none rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <DialogClose
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </DialogClose>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 ${
              loading ? "bg-gray-400" : "bg-green-500"
            } text-white rounded-md`}
          >
            {loading ? "Updating..." : "Update User"}
          </button>
          <DialogClose ref={dialogclose} />
        </div>
      </form>
    </div>
  );
};

export default EditUserManage;
