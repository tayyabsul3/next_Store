import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state shape explicitly with proper types.
interface orderState {
  orders: any[];
}

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {},
  } as orderState,
  reducers: {
    createOrder: (state, action) => {
      const { data } = action.payload;
      state.orders = data;
    },
  },
});

export const { createOrder } = orderSlice.actions;

export default orderSlice.reducer;
