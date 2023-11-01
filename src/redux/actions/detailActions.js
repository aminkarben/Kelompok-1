import axios from "axios";
import { setDetailMovie, setVideoData } from "../reducers/detailReducers";
import { isAxiosError } from "axios";

export const getDetail = (id, languageValue) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(
      `${import.meta.env.VITE_VERCEL_API_URL}/${id}?language=${languageValue}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response.data;
    dispatch(setDetailMovie(data));
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error?.response?.data?.message);
      return;
    }
    console.error(error);
  }
};

export const getVideo = (movieId) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    const response = await axios.get(
      `${import.meta.env.VITE_VERCEL_API_URL}/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response.data;

    if (data?.videos) {
      const trailer = data?.videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        const trailerKey = trailer.key;
        dispatch(setVideoData(trailerKey));
      } else {
        const firstVideo = data.videos.find(
          (video) => video.site === "YouTube"
        );
        if (firstVideo) {
          const videoKey = firstVideo.key;
          dispatch(setVideoData(videoKey));
        }
      }
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error?.response?.data?.message);
      return;
    }
    console.error(error);
  }
};
