import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isFullScreenVideo: boolean;
}

const initialState: IInitialState = {
  isFullScreenVideo: false,
};

const fullscreenSlice = createSlice({
  name: "fullscreen",
  initialState,
  reducers: {
    clear: () => initialState,
    setStream: (state, action: PayloadAction<boolean>) => {
      state.isFullScreenVideo = action.payload;
    },
  },
});

export const actions = {
  ...fullscreenSlice.actions,
};

export const { reducer } = fullscreenSlice;
