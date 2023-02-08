import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Placeholder {
  isFocus: boolean;
}

const initialState: Placeholder = {
  isFocus: false,
};

const config = createSlice({
  name: "placeholder",
  initialState,
  reducers: {
    clear: () => initialState,
    setStream: (state, action: PayloadAction<boolean>) => {
      state.isFocus = action.payload;
    },
  },
});

export const actions = {
  ...config.actions,
};

export const { reducer } = config;
