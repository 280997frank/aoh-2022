import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isOpen: boolean;
  streamUrl: string;
  slidoUrl: string;
  streamType: string;
}

const initialState: IInitialState = {
  isOpen: false,
  streamUrl: "",
  slidoUrl: "",
  streamType: "",
};

const liveStreamSlice = createSlice({
  name: "live-stream",
  initialState,
  reducers: {
    clear: () => initialState,
    setStream: (state, action: PayloadAction<IInitialState>) => {
      state.isOpen = action.payload.isOpen;
      state.streamUrl = action.payload.streamUrl;
      state.slidoUrl = action.payload.slidoUrl;
      state.streamType = action.payload.streamType;
    },
  },
});

export const actions = {
  ...liveStreamSlice.actions,
};

export const { reducer } = liveStreamSlice;
