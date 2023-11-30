import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface datatype {
  data: string;
}
const initialState = {
  data: "",
} as datatype;

export const pokeSlice = createSlice({
  name: "pokeSearching",
  initialState,
  reducers: {
    Searchpokemon: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { Searchpokemon } = pokeSlice.actions;
export default pokeSlice.reducer;
