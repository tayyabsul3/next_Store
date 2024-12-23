import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface userState {
  user: { email: ""; _id: ""; password: ""; name: "Guest"; role: "" };
  wishlist: any[];
  isAuthenticated: boolean;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { email: "", _id: "", password: "", name: "Guest", role: "" },
    wishlist: [],
    isAuthenticated: false,
  } as userState,
  reducers: {
    Authenticate: (state, action) => {
      const { auth, user } = action.payload;
      if (!auth) {
        state.user = user;
      }
      state.isAuthenticated = auth;
    },
    UpdateUserData: (state, action) => {
      const { user } = action.payload;

      if (user) {
        state.user = user;
      }
    },
    Login: (state, action) => {
      const { data } = action.payload;
      const { email, password } = data;
      let cloned = { ...state.user, email: email, password: password };

      state.user = cloned;
      state.isAuthenticated = true;
    },
    Signup: (state, action) => {
      const { data } = action.payload;
      state.user = data;
      state.isAuthenticated = true;
    },
    addtowishlist: (state, action) => {
      const { product } = action.payload;
      const existingindex = state.wishlist.findIndex(
        (d) => d._id === product._id
      );
      if (existingindex !== -1) {
        toast.error("Poduct already in Widhlist");
        return;
      } else {
        state.wishlist.push(product);
      }
    },
    removefromwishlist: (state, action) => {
      const { id } = action.payload;
      const updatedWishlist = state.wishlist.filter((item) => item._id !== id);
      state.wishlist = updatedWishlist;
    },
  },
});

export const {
  Authenticate,
  UpdateUserData,
  Signup,
  removefromwishlist,
  Login,
  addtowishlist,
} = userSlice.actions;

export default userSlice.reducer;
