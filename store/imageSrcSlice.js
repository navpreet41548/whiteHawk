import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

export const imageSrcSlice = createSlice({
  name: "imageSrc",
  initialState,
  reducers: {
    addImageSrc: (state, action) => {
      state.images = [...state.images, action.payload];
      //   state.imageSrc.concat(state.payload);
    },
    removeImageSrc: (state) => {
      state.images = [];
    },
  },
});

export const { addImageSrc, removeImageSrc } = imageSrcSlice.actions;

export default imageSrcSlice.reducer;
