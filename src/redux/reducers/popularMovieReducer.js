import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalResult: null,
    popularMovies: [],
};

const popularSlice = createSlice({
    name: "popular",
    initialState,
    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        setTotalResult: (state, action) => {
            state.totalResult = action.payload;
        },
    },
});

export const { setPopularMovies, setTotalResult } = popularSlice.actions;
export default popularSlice.reducer;
