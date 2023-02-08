import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducer as liveStreamReducer } from "@/states/live-stream/slices";
import { reducer as slideReducer } from "@/states/venue/slices";
import { reducer as userReducer } from "@/states/user/slice";
import { reducer as registerReducer } from "@/states/register/slice";
import { reducer as gameReducer } from "@/states/game/slice";
import { reducer as fullscreenVideoReducer } from "@/states/fullscreen/slice";
import { reducer as placeholderReducer } from "@/states/placeholder/slice";

const rootReducer = combineReducers({
  liveStream: liveStreamReducer,
  slide: slideReducer,
  user: userReducer,
  register: registerReducer,
  game: gameReducer,
  fullscreenVideo: fullscreenVideoReducer,
  placeholder: placeholderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
