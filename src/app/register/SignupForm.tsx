"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { Signup } from "@/redux/slices/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAgreed: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, termsAgreed } = formData;
    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true, // This ensures credentials (like cookies) are included in cross-origin requests
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, user } = response.data;

      dispatch(
        Signup({
          data: user,
        })
      );
      toast.success("User LoggedIn " + user._id);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      setFormData({
        name: "",
        email: "",
        password: "",
        termsAgreed: false,
      });
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white p-10">
      <h2 className="text-3xl font-semibold mb-4">Register</h2>
      <p className="text-gray-400 mb-6">
        Already have an account?{" "}
        <Link href="/login" className="text-emerald-500 font-bold">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full border-b p-3 outline-none pl-0 "
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full border-b p-3 outline-none pl-0 "
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border-b p-3 outline-none pl-0 "
          value={formData.password}
          onChange={handleChange}
        />
        <div className="flex items-start">
          <input
            type="checkbox"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={() =>
              setFormData({ ...formData, termsAgreed: !formData.termsAgreed })
            }
            className="accent-black mr-2 mt-2 border-gray-300 rounded-md"
          />
          <label className="text-gray-600">
            I agree with{" "}
            <Link href="/privacy-policy" className="font-bold">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-of-use" className="font-bold">
              Terms of Use
            </Link>
          </label>
        </div>
        <button
          type="submit"
          className="bg-black text-white font-semibold py-3 px-4 rounded-md w-full hover:bg-black/90"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
