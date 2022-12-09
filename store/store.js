import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import imageSrc from "./imageSrcSlice";
import cart from "./cartSlice";
import formSlice from "./formSlice";
import wishlist from "./wishlistSlice";
import user from "./userSlice";

const combinedReducer = combineReducers({
  imageSrc,
  cart,
  wishlist,
  formSlice,
  user,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(makeStore);
