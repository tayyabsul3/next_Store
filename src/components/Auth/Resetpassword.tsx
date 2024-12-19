"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
const Resetpassword = ({ token }: { token: string }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    rememberMe: false,
    showPasswordnew: false,
    showPasswordconfirm: false, // Added showPassword state
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();
  const [forgotPassword, setforgotPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      setErrorMessage("Please enter both passwords.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    setErrorMessage(null);
    const { confirmPassword, newPassword } = formData;

    try {
      console.log(`http://localhost:4000/users/password/reset/${token}`);
      const { data } = await axios.put(
        `http://localhost:4000/users/password/reset/${token}`,
        {
          password: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          withCredentials: true, // This ensures credentials (like cookies) are included in cross-origin requests
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Password Changed Successfully");
      router.push("/login");
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

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <input
            type={formData.showPasswordnew ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            className="outline-none border-b pl-0 p-3  w-full"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() =>
              setFormData({
                ...formData,
                showPasswordnew: !formData.showPasswordnew,
              })
            }
          >
            {formData.showPasswordnew ? "Hide" : "Show"}
          </button>
        </div>{" "}
        <div className="relative">
          <input
            type={formData.showPasswordconfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="outline-none border-b pl-0 p-3  w-full"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() =>
              setFormData({
                ...formData,
                showPasswordconfirm: !formData.showPasswordconfirm,
              })
            }
          >
            {formData.showPasswordconfirm ? "Hide" : "Show"}
          </button>
        </div>
        {/* Error message display */}
        {errorMessage && (
          <div className=" text-red-600  p-3 rounded-md mb-4">
            * {errorMessage}
          </div>
        )}
        <div className="flex justify-between pt-2 ">
          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 px-4 rounded-md w-full hover:bg-black/90"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Resetpassword;
