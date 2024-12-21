import { useAppDispatch } from "@/redux/hooks";
import { Authenticate, UpdateUserData } from "@/redux/slices/user";
import axios from "axios";
import { DispatchProp } from "react-redux";
import { toast } from "sonner";

export const getUserData = async (dispatch: any) => {
  try {
    const { data } = await axios.get("http://localhost:4000/users/me", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Fetched User Data :", data.user);
    dispatch(
      UpdateUserData({
        user: data.user[0],
      })
    );
    dispatch(Authenticate({ user: data.user, auth: true }));
  } catch (error: any) {
    dispatch(Authenticate({ user: {}, auth: false }));
    console.log(error.response.data.message);
    toast.message("Please Login for better experience");
  }
};
