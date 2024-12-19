"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Load from "../Reusables/Load";
import { useAppSelector } from "@/redux/hooks";

const Details = () => {
  const { user: ReduxUser } = useAppSelector((state) => state.user);
  const [user, setUser] = useState({
    ...ReduxUser,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    showoldPassword: false,
    shownewPassword: false,
    shownewconfirmPassword: false,
  });

  // Track if any field is modified
  const [modified, setModified] = useState(false);

  // Handle change in form fields
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      const updatedUser = { ...prevState, [name]: value };

      // Check if displayName or email is modified
      if (value.trim() !== "") {
        setModified(true);
      } else {
        setModified(false);
      }
      return updatedUser;
    });
  };

  // Button styling based on modification
  const buttonStyle = modified
    ? "bg-black text-white p-2  transition-all duration-300 w-fit rounded-md hover:bg-black/90 text-xs px-5"
    : "bg-gray-100 text-gray-300 p-2  transition-all duration-300 w-fit rounded-md cursor-not-allowed text-xs px-5";

  const [load, setload] = useState(false);

  const handleUpdatePassword = async () => {
    if (user.newPassword !== user.confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (
      user.oldPassword.trim() === "" ||
      user.newPassword.trim() === "" ||
      user.confirmNewPassword.trim() === ""
    ) {
      toast.error("Please fill all password fields and try again.");
      return;
    }

    // Prepare data for API request
    const data = {
      password: user.oldPassword,
      newPassword: user.newPassword,
      confirmPassword: user.confirmNewPassword,
    };
    console.log(data);

    try {
      setload(true);
      // Make API request using Axios
      const response = await axios.put(
        "http://localhost:4000/users/password/update",
        data,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response
      if (response.status === 200) {
        toast.success("Password updated successfully");
        setUser((prev) => {
          return {
            ...prev,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          };
        });
        
      }
    } catch (err) {
      toast.error("Failed to update password. Please try again later.");
      console.error("Error updating password:", err);
    } finally {
      setload(false);
    }
  };

  return (
    <div className="AccountDetails w-full flex gap-10">
      <div className="space-y-5 flex-1">
        <h1 className="font-semibold text-xl">Account Details</h1>
        <div className="field flex flex-col gap-2 w-full">
          <label
            htmlFor="email"
            className="font-semibold uppercase text-xs text-gray-500"
          >
            Id
          </label>
          <input
            type="email"
            name="email"
            value={user._id}
            placeholder="id"
            className="border p-2 px-5 text-xs w-full outline-none border-gray-400 rounded-lg bg-transparent"
            readOnly
          />
        </div>
        <div className="field flex flex-col gap-2 w-full">
          <label
            htmlFor="displayName"
            className="font-semibold uppercase text-xs text-gray-500"
          >
            Display Name *
          </label>
          <input
            type="text"
            name="displayName"
            value={user.name}
            onChange={handleChange}
            readOnly
            placeholder="Display name"
            className="border p-2 px-5 text-xs w-full outline-none border-gray-400 rounded-lg bg-transparent"
          />
        </div>
        <div className="field flex flex-col gap-2 w-full">
          <label
            htmlFor="email"
            className="font-semibold uppercase text-xs text-gray-500"
          >
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 px-5 text-xs w-full outline-none border-gray-400 rounded-lg bg-transparent"
            readOnly
          />
        </div>
      </div>

      <div className="space-y-5 flex-1">
        <h1 className="font-semibold text-xl">Password</h1>
        <div className="field flex flex-col gap-2 w-full">
          <label
            htmlFor="oldPassword"
            className="font-semibold uppercase text-xs text-gray-500"
          >
            Old Password *
          </label>
          <div className="relative">
            <input
              type={user.showoldPassword ? "text" : "password"}
              name="oldPassword"
              value={user.oldPassword}
              onChange={handleChange}
              placeholder="Old password"
              className="border p-2 px-5 text-xs w-full outline-none border-gray-400 rounded-lg bg-transparent"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform text-xs -translate-y-1/2"
              onClick={() =>
                setUser({
                  ...user,
                  showoldPassword: !user.showoldPassword,
                })
              }
            >
              {user.showoldPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="field flex flex-col gap-2 w-full">
          <label
            htmlFor="newPassword"
            className="font-semibold uppercase text-xs text-gray-500"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={user.shownewPassword ? "text" : "password"}
              name="newPassword"
              value={user.newPassword}
              onChange={handleChange}
              placeholder="New password"
              className="border p-2 px-5 text-xs w-full outline-none border-gray-400 rounded-lg bg-transparent"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform text-xs -translate-y-1/2"
              onClick={() =>
                setUser({
                  ...user,
                  shownewPassword: !user.shownewPassword,
                })
              }
            >
              {user.shownewPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="field flex flex-col gap-2 w-full">
          <label
            htmlFor="confirmNewPassword"
            className="font-semibold uppercase text-xs text-gray-500"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={user.shownewconfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={user.confirmNewPassword}
              onChange={handleChange}
              placeholder="Repeat New Password"
              className="border p-2 px-5 text-xs w-full outline-none border-gray-400 rounded-lg bg-transparent"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform text-xs -translate-y-1/2"
              onClick={() =>
                setUser({
                  ...user,
                  shownewconfirmPassword: !user.shownewconfirmPassword,
                })
              }
            >
              {user.shownewconfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          onClick={handleUpdatePassword}
          className={buttonStyle}
          disabled={!modified}
        >
          {load ? <Load size={20} /> : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default Details;
