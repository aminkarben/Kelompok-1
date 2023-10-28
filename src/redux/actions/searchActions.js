import axios from "axios";
import {
    setSearchedMovies,
    setTotalPages,
    setTotalResult,
} from "../reducers/searchReducers";
import { isAxiosError } from "axios";

export const getSearchData =
    (queryValue, pageValue) => async (dispatch, getState) => {
        try {
            const token = getState().popular.token;

            if (queryValue) {
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
            }
        } catch (error) {
            if (isAxiosError(error)) {
                alert(error?.response?.data?.message);
                return;
            }
            alert(error?.message);
        }
    };

export default getSearchData;
