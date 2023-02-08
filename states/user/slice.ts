import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  ticketQty: number;
}

type UserWithoutTicket = Omit<User, "ticketQty">;

const initialState: User = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  ticketQty: 0,
};

const config = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear: () => initialState,
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserWithoutTicket>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setTicketQty: (state, action: PayloadAction<number>) => {
      state.ticketQty = action.payload;
    },
  },
});

export const actions = {
  ...config.actions,
};

export const reducer = config.reducer;
