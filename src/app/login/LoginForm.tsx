"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Login } from "@/redux/slices/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Forgotpassword from "../../components/Auth/Forgotpassword";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
    showPassword: false, // Added showPassword state
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

  const handleSubmit = async () => {
    if (!formData.usernameOrEmail || !formData.password) {
      setErrorMessage("Please enter both your username/email and password.");
      return;
    }

    setErrorMessage(null);
    const { usernameOrEmail, password } = formData;

    try {
      const response = await axios.post(
        "http://localhost:4000/users/login",
        {
          email: usernameOrEmail,
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
        Login({
          data: user,
        })
      );
      toast.success("User LoggedIn");
      router.push("/");
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
    <>
      {!forgotPassword ? (
        <div className=" p-10 w-full   ">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
          <p className="text-gray-400 mb-6">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-emerald-500 font-bold">
              Register
            </Link>
          </p>

          <div className="space-y-4">
            <input
              type="email"
              name="usernameOrEmail"
              placeholder="Your username or email address"
              className="outline-none border-b pl-0 p-3  w-full"
              value={formData.usernameOrEmail}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="outline-none border-b pl-0 p-3  w-full"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() =>
                  setFormData({
                    ...formData,
                    showPassword: !formData.showPassword,
                  })
                }
              >
                {formData.showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Error message display */}
            {errorMessage && (
              <div className=" text-red-600  p-3 rounded-md mb-4">
                * {errorMessage}
              </div>
            )}

            <div className="flex justify-between pt-5">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      rememberMe: !formData.rememberMe,
                    })
                  }
                  className="mr-2 mt-1 border-gray-300 rounded-md"
                />
                <label className="text-gray-600">Remember me</label>
              </div>
              <button
                onClick={() => setforgotPassword(true)}
                className="text-black hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="bg-black text-white font-semibold py-3 px-4 rounded-md w-full hover:bg-black/90"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Forgotpassword />
      )}
    </>
  );
};

export default LoginForm;
