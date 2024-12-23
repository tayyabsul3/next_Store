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
    cart: [],
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
