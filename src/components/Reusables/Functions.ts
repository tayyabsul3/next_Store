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

    console.log("Fetched User Data");
    dispatch(
      UpdateUserData({
        user: data.user,
      })
    );
    dispatch(Authenticate({}));
  } catch (error: any) {
    console.log(error.response.data.message);
    toast.message("Please Login for better experience");
  }
};
