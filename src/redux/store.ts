import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product";
import orderReducer from "./slices/order";
import userReducer from "./slices/user";
import globalState from "./slices/states";

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
      globalState: globalState,
      order: orderReducer,
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
