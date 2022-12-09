import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: { login: true, visible: false },
};

export const formSlice = createSlice({
  name: "formState",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.form = action.payload;
      //   state.imageSrc.concat(state.payload);
    },
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;
