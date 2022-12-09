import { createSlice } from "@reduxjs/toolkit";
import cookies from "js-cookie";

const initialState = {
  wishlistItem: cookies.get("WishList")
    ? JSON.parse(cookies.get("WishList"))
    : [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishList: (state, action) => {
      cookies.set(
        "WishList",
        // JSON.stringify([...state.wishlistItem, action.payload]),
        JSON.stringify([...state.wishlistItem, action.payload]),
        {
          expires: 7,
        }
      );
      state.wishlistItem = [...state.wishlistItem, action.payload];
      //   state.imageSrc.concat(state.payload);
    },
    removeWishList: (state, action) => {
      const index = state.wishlistItem.indexOf(action.payload);
      if (index > -1) {
        state.wishlistItem.splice(index, 1);
      }
      cookies.set("WishList", JSON.stringify(state.wishlistItem), {
        expires: 7,
      });

      state.wishlistItem = state.wishlistItem;
      //   var product = state.wishlistItem;
      //   const filterVal = action.payload;
      //   const filteredElements = product.filter(
      //     (val) => val.productId != filterVal
      //   );

      //   cookies.set("WishList", JSON.stringify(filteredElements), {
      //     expires: 7,
      //   });
      //   state.wishlistItem = filteredElements;
      //   state.cartItem = [...state.cartItem, action.payload];
    },
  },
});

export const { addWishList, removeWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
