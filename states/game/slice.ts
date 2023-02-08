import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Game {
  name: string;
}

const initialState: Game = {
  name: "",
};

const config = createSlice({
  name: "game",
  initialState,
  reducers: {
    clear: () => initialState,
    setGame: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const actions = {
  ...config.actions,
};

export const { reducer } = config;
