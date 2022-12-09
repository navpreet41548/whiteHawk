import { createSlice } from "@reduxjs/toolkit";
import cookies from "js-cookie";

const initialState = {
  cartItem: cookies.get("CartItem") ? JSON.parse(cookies.get("CartItem")) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      cookies.set(
        "CartItem",
        // JSON.stringify([...state.cartItem, action.payload]),
        JSON.stringify([...state.cartItem, action.payload]),
        {
          expires: 7,
        }
      );
      const total = action.payload.quantity * action.payload.price;
      action.payload.total = total;
      state.cartItem = [...state.cartItem, action.payload];
      //   state.imageSrc.concat(state.payload);
    },
    removeCartItem: (state, action) => {
      var product = state.cartItem;
      const filterVal = action.payload;
      const filteredElements = product.filter(
        (val) => val.productId != filterVal
      );

      cookies.set("CartItem", JSON.stringify(filteredElements), {
        expires: 7,
      });
      state.cartItem = filteredElements;
      //   state.cartItem = [...state.cartItem, action.payload];
    },
    updateCartItem: (state, action) => {
      // var product = state.cartItem;
      // const filterVal = action.payload.productId;
      // const filteredElements = product.filter(
      //   (val) => val.productId != filterVal
      // );
      // filteredElements.push(action.payload);
      const objIndex = state.cartItem.findIndex(
        (obj) => obj.productId == action.payload.productId
      );

      const total = action.payload.quantity * action.payload.price;

      state.cartItem[objIndex].quantity = action.payload.quantity;
      state.cartItem[objIndex].price = action.payload.price;
      state.cartItem[objIndex].total = total;

      cookies.set("CartItem", JSON.stringify(state.cartItem), {
        expires: 7,
      });

      state.cartItem = state.cartItem;
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
