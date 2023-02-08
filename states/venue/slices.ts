import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  defaultSlide: number;
}

const initialState: InitialState = {
  defaultSlide: 0,
};

const defaultSlideSlice = createSlice({
  name: "defaultSlide",
  initialState,
  reducers: {
    setDefaultSlide: (state, action) => {
      state.defaultSlide = action.payload;
    },
  },
});

export const actions = {
  ...defaultSlideSlice.actions,
};

export const { reducer } = defaultSlideSlice;
