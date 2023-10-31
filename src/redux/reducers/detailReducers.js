import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detailMovie: [],
};

const detailsSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {
        setDetailMovie: (state, action) => {
            state.detailMovie = action.payload;
        },
    },
});

export const { setDetailMovie } = detailsSlice.actions;
export default detailsSlice.reducer;
