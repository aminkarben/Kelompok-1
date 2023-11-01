import axios from "axios";
import {
  setIsLoading,
  setSearchedMovies,
  setTotalPages,
  setTotalResult,
} from "../reducers/searchReducers";
import { isAxiosError } from "axios";

export const getSearchData =
  (queryValue, pageValue) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      if (queryValue) {
        dispatch(setIsLoading(true));
        const response = await axios.get(
          `${
            import.meta.env.VITE_VERCEL_SEARCH_URL
          }?query=${queryValue}&page=${pageValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data, total_pages, total_results } = response.data;

        dispatch(setTotalPages(total_pages));
        dispatch(setTotalResult(total_results));
        dispatch(setSearchedMovies(data));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.error(error?.response?.data?.message);
        return;
      }
      dispatch(setIsLoading(false));
    }
  };

export default getSearchData;
