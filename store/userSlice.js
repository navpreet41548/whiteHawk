import { createSlice } from "@reduxjs/toolkit";
import cookies from "js-cookie";

const initialState = {
  user: cookies.get("user") ? JSON.parse(cookies.get("user")) : {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      cookies.set("user", JSON.stringify(action.payload), {
        expires: 30,
      });
      console.log(state);
      state.user = action.payload;
      //   state.imageSrc.concat(state.payload);
    },
    removeUser: (state) => {
      cookies.set("user", "", {
        expires: 30,
      });
      state.user = {};
      //   state.cartItem = [...state.cartItem, action.payload];
    },
  },
});

export const { removeUser, addUser } = userSlice.actions;

export default userSlice.reducer;
