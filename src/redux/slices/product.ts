import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define the initial state shape explicitly with proper types.
interface ProductState {
  items: any[];
  item: any;
  cart: any[];
}

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    item: {},
    cart: [
      {
        _id: "6760162a632f285030e1e87b",
        title: "Red Lipstick",
        description:
          "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        category: "beauty",
        price: 12.99,
        numOfReviews: 1,
        quantity: 1,
        rating: 3.625,
        stock: 68,
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
        discountPercentage: 19.03,
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
        ],
        tags: ["New"],
        reviews: [
          {
            user: "675fcb59d119938f2f3d140b",
            name: "leo rivera",
            date: "2024-12-16T09:51:57.647Z",
            rating: 5,
            comment: "Great product!",
            _id: "6760162a632f285030e1e87c",
          },
          {
            user: "675fcb59d119938f2f3d140b",
            name: "oscar powers",
            date: "2024-12-16T09:51:57.647Z",
            rating: 4,
            comment: "Very pleased!",
            _id: "6760162a632f285030e1e87d",
          },
          {
            user: "675fcb59d119938f2f3d140b",
            name: "carter rivera",
            date: "2024-12-16T09:51:57.647Z",
            rating: 5,
            comment: "Very pleased!",
            _id: "6760162a632f285030e1e87e",
          },
          {
            user: "67642dfced8964192eb64497",
            name: "Muhammad Tayyab",
            date: "2024-12-23T10:08:26.055Z",
            rating: 0.5,
            comment: "dad",
            _id: "6769369d983d16eb6c6c49d4",
          },
        ],
        user: "675fcb59d119938f2f3d140b",
        createdAt: "2024-12-16T09:51:57.647Z",
        __v: 1,
      },
    ],
  } as ProductState,
  reducers: {
    addtocart: (state, action: PayloadAction<{ item: Product }>) => {
      const { item } = action.payload;
      const id = item._id;
      let ClonedItem = [...state.cart];
      const existingIndex = ClonedItem.findIndex((i) => i._id === id);
      if (existingIndex !== -1) {
        ClonedItem[existingIndex].quantity += item.quantity;
        state.cart = ClonedItem;
      } else {
        state.cart.push(item);
      }

      toast.success("Item added successfully\n id:" + item._id);
    },
    removefromcart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((i) => i._id !== id);
    },
    updateQuantity: (state, action) => {
      console.log("Updated quantity");
      const { id, type } = action.payload;
      let ClonedItem = [...state.cart];
      ClonedItem = ClonedItem.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity:
              type === "increase"
                ? item.quantity + 1
                : item.quantity > 1
                ? item.quantity - 1
                : item.quantity,
          };
        }
        return item;
      });
      state.cart = ClonedItem;
    },
    updateProductData: (state, action) => {
      const { cart } = action.payload;
      if (cart) {
        state.cart = cart;
      }
    },
  },
});

export const { addtocart, updateProductData, updateQuantity, removefromcart } =
  productSlice.actions;

export default productSlice.reducer;
