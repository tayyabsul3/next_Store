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
    wishlist: [
      {
        id: 2,
        title: "Eyeshadow Palette with Mirror",
        description:
          "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
        category: "beauty",
        price: 19.99,
        discountPercentage: 5.5,
        rating: 3.28,
        stock: 44,
        tags: ["beauty", "eyeshadow"],
        brand: "Glamour Beauty",
        sku: "MVCFH27F",
        weight: 3,
        dimensions: {
          width: 12.42,
          height: 8.63,
          depth: 29.13,
        },
        quantity: 1,
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships in 2 weeks",
        availabilityStatus: "In Stock",
        reviews: [
          {
            rating: 4,
            comment: "Very satisfied!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Liam Garcia",
            reviewerEmail: "liam.garcia@x.dummyjson.com",
          },
          {
            rating: 1,
            comment: "Very disappointed!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Nora Russell",
            reviewerEmail: "nora.russell@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Highly impressed!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Elena Baker",
            reviewerEmail: "elena.baker@x.dummyjson.com",
          },
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 32,
        meta: {
          createdAt: "2024-05-23T08:56:21.618Z",
          updatedAt: "2024-05-23T08:56:21.618Z",
          barcode: "2817839095220",
          qrCode: "https://assets.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
      },
    ],
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
        toast.error("item already exists");
        return;
      } else {
        state.wishlist.push(product);
      }
    },
    removefromwishlist: (state, action) => {
      const { id } = action.payload;
      const updatedWishlist = state.wishlist.filter((item) => item.id !== id);
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
