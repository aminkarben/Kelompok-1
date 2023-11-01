import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailMovie: [],
  videoData: null,
};

const detailsSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetailMovie: (state, action) => {
      state.detailMovie = action.payload;
    },
    setVideoData: (state, action) => {
      state.videoData = action.payload;
    },
  },
});

export const { setDetailMovie, setVideoData } = detailsSlice.actions;
export default detailsSlice.reducer;
