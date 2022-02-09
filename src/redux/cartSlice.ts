import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../interfaces/IProduct";
import type { RootState } from "./store";

const initialState = {
  cartData: [] as IProduct[],
  cartCounter: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    totalPrice: (state) => {
      const cartState = state;
      const cart = cartState.cartData;
      cartState.totalPrice = 0;

      cart.map((item) => {
        cartState.totalPrice += item.price * item.quantity;
        return cartState.totalPrice;
      });
    },
    addToCart: (state, action: PayloadAction<IProduct | never>) => {
      const cartState = state;
      const cart = cartState.cartData;

      const existingItem = cart.find((cartItem: IProduct) => cartItem.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(action.payload as never);
      }

      cartState.cartCounter += 1;
    },
    removeFromCart: (state, action: PayloadAction<IProduct | never>) => {
      const cartState = state;
      const cart = cartState.cartData;

      const temp = cart.some((i) => i.id === action.payload.id);
      if (temp) {
        const itemIndex = cart.findIndex((el) => el.id === action.payload.id);
        if (cart[itemIndex].quantity) {
          cart[itemIndex].quantity -= 1;
          cartState.cartCounter -= 1;
        }
        if (!cart[itemIndex].quantity) {
          cart.splice(itemIndex, 1);
        }
      }
    },
    clearCartData: (state) => {
      const cartState = state;
      cartState.cartData = [];
      cartState.cartCounter = 0;
      cartState.totalPrice = 0;
    },
  },
});

export const { totalPrice, addToCart, removeFromCart, clearCartData } = cartSlice.actions;
export const selectCart = (state: RootState) => state.storeData.persistedCartReducer.cartData;
export const selectCartCounter = (state: RootState) => state.storeData.persistedCartReducer.cartCounter;
export const selectTotalPrice = (state: RootState) => state.storeData.persistedCartReducer.totalPrice;
export default cartSlice.reducer;
