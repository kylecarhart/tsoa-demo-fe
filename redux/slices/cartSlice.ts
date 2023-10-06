import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Item, OrderItem } from "../../@generated/src";

// Define a type for the slice state
interface CartState {
  items: OrderItem[];
  total: number;
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  items: [],
  total: 0,
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const itemToFind = state.items.find(
        (item) => item.item.id === action.payload.id
      );

      // Add the item or update the quantity
      if (itemToFind) {
        itemToFind.quantity += 1;
      } else {
        state.items.push({ item: action.payload, quantity: 1 });
      }

      // Update the total
      state.total = totalCart(state.items);
    },
    removeItem: (state, action: PayloadAction<Item>) => {
      const itemToFind = state.items.find(
        (item) => item.item.id === action.payload.id
      );

      // Update the quantity or remove the item
      if (itemToFind && itemToFind.quantity > 1) {
        if (itemToFind.quantity > 1) {
          itemToFind.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.item.id !== action.payload.id
          );
        }
      }

      // Update the total
      state.total = totalCart(state.items);
    },
    clear: (state) => {
      state.items = [];
      state.total = 0;
    },
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

/**
 * Total the cart items.
 * @param items Order Items
 * @returns The cart total
 */
function totalCart(items: OrderItem[]) {
  return items.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
}

export const { addItem, removeItem, clear, open, close } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.cart.items;
export const selectTotal = (state: RootState) => state.cart.total;
export const selectIsOpen = (state: RootState) => state.cart.isOpen;
export const selectQuantity = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export default cartSlice.reducer;
