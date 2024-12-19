"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Login } from "@/redux/slices/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
const Forgotpassword = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();

  const handleSubmit = async () => {
    // if (!formData.usernameOrEmail) {
    //   setErrorMessage("Please enter both your username/email and password.");
    //   return;
    // }
    setErrorMessage(null);
    const { usernameOrEmail } = formData;
    console.log(usernameOrEmail);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/users/password/forgot",
        {
          email: usernameOrEmail,
        },
        {
          withCredentials: true, // This ensures credentials (like cookies) are included in cross-origin requests
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      router.push(`/reset/${data.token}`);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      toast.error(error.response.data.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    // dispatch(
    //   Login({
    //     data: {
    //       email: usernameOrEmail,
    //       password,
    //     },
    //   })
    // );
  };

  return (
    <div className=" p-10 w-full   ">
      <h2 className="text-3xl font-semibold mb-4">Forgot Password</h2>

      <div className="space-y-10">
        <input
          type="email"
          name="usernameOrEmail"
          placeholder="Your username or email address"
          className="outline-none border-b pl-0 p-3  w-full"
          value={formData.usernameOrEmail}
          onChange={handleChange}
        />

        {/* Error message display */}
        {errorMessage && (
          <div className=" text-red-600  p-3 rounded-md mb-4">
            * {errorMessage}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="bg-black text-white font-semibold py-3 px-4 rounded-md w-full hover:bg-black/90"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
