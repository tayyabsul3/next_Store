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
        stock: 1,
        _id: "675fd44163b9914ec291790a",
        title: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        numOfReviews: 0,
        rating: 4.94,
        Stock: 1,
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
        discountPercentage: 7.17,
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
        ],
        tags: ["New"],
        reviews: [
          {
            user: "675fcb59d119938f2f3d140b",
            name: "John Doe",
            date: "2024-05-23T08:56:21.618Z",
            rating: 2,
            comment: "Very unhappy with my purchase!",
            _id: "675fd44163b9914ec291790b",
          },
        ],
        user: "675fcb59d119938f2f3d140b",
        createdAt: "2024-12-16T07:18:21.466Z",
        __v: 0,
        quantity: 1,
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
