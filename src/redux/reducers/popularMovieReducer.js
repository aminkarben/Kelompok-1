import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  popularMovies: [],
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
  },
});

export const { setPopularMovies } = popularSlice.actions;
export default popularSlice.reducer;
