import axios from "axios";
import { setPopularMovies } from "../reducers/popularMovieReducer";

export const getPopularData = () => async (dispatch, getState) => {
  try {
    const token = getState().popular.token;

    const response = await axios.get(
      `${import.meta.env.VITE_VERCEL_API_URL}/popular`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response.data;
    dispatch(setPopularMovies(data));
  } catch (error) {
    // eslint-disable-next-line no-undef
    if (isAxiosError(error)) {
      alert(error?.response?.data?.message);
      return;
    }
    alert(error?.message);
  }
};

export default getPopularData;
