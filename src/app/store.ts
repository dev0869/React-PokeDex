import { configureStore } from "@reduxjs/toolkit";
import pokeSlice from "../features/pokeSlice";
export const store = configureStore({
  reducer: {
    pokemon: pokeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
