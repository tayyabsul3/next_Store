import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface globalState {
  iscartvisible: boolean;
  mobileheader: boolean;
}

const globalState = createSlice({
  name: "globalState",
  initialState: {
    iscartvisible: false,
    mobileheader: false,
  } as globalState,
  reducers: {
    toogleShowCart: (state, action) => {
      state.iscartvisible = !state.iscartvisible;
    },
    toogleShowHeader: (state, action) => {
      state.mobileheader = !state.mobileheader;
    },
    updateState: (state, action) => {
      const { mobileheader } = action.payload;
      if (mobileheader) {
        state.mobileheader = mobileheader;
      }
    },
  },
});

export const { toogleShowCart, updateState, toogleShowHeader } =
  globalState.actions;

export default globalState.reducer;
