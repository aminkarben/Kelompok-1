import axios from "axios";
import { setDetailMovie } from "../reducers/detailReducers";
import { isAxiosError } from "axios";

export const getDetail = (id, languageValue) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
        const response = await axios.get(
            `${
                import.meta.env.VITE_VERCEL_API_URL
            }/${id}?language=${languageValue}`,
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
    }
};
