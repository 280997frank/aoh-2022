import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  code?: string;
  password: string;
}

const initialState: RegisterPayload = {
  email: "",
  firstName: "",
  lastName: "",
  code: "",
  password: "",
};

const config = createSlice({
  name: "register",
  initialState,
  reducers: {
    clear: () => initialState,
    setPayload: (state, action: PayloadAction<RegisterPayload>) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const actions = {
  ...config.actions,
};

export const reducer = config.reducer;
