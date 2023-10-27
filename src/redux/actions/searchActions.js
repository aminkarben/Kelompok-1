import axios from "axios";
import { setSearchedMovies, setTotalPages } from "../reducers/searchReducers";
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

                const { data } = response.data;
                const { total_pages } = response.data;
                dispatch(setTotalPages(total_pages));
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
