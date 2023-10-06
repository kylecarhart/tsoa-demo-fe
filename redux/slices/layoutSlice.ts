import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface LayoutState {
  isCartOpen: boolean;
}

// Define the initial state using that type
const initialState: LayoutState = {
  isCartOpen: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openCart, closeCart } = layoutSlice.actions;

export default layoutSlice.reducer;
