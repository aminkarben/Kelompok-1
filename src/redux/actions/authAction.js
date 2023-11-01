import axios from "axios";
import { setToken } from "../reducers/authReducer";
import { setUser } from "../reducers/profileReducers";
import Swal from "sweetalert2";

export const registerLoginWithGoogleAction =
    (accessToken, navigate) => async (dispatch) => {
        try {
            let data = JSON.stringify({
                access_token: accessToken,
            });

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_VERCEL_AUTH}/google`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            const response = await axios.request(config);
            const { token } = response.data.data;

            dispatch(setToken(token));

            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error(error.response.data.message);
                return;
            }
            console.error(error.message);
        }
    };

export const register =
    (email, name, password, navigate) => async (dispatch) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_VERCEL_AUTH}/register`,
                {
                    email,
                    name,
                    password,
                }
            );

            const { data } = response.data;
            const { token } = data;
            dispatch(setToken(token));

            Swal.fire({
                title: "Success!",
                text: "Registrasi Berhasil Silahkan Login!",
                icon: "success",
                confirmButtonText: "OK",
                color: "green",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to home
                    navigate("/login");
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                Swal.fire({
                    title: "Failed!",
                    text: error?.response?.data?.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }

            Swal.fire({
                title: "Failed!",
                text: error?.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

export const login = (email, password, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_VERCEL_AUTH}/login`,
            {
                email,
                password,
            }
        );
        const { data } = response.data;
        const { token } = data;

        // Save our token and global state
        dispatch(setToken(token));

        Swal.fire({
            title: "Success",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "OK",
            color: "green",
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect to home
                navigate("/");
            }
        });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Handle Axios error
            const errorMessage =
                error?.response?.data?.message || error?.message;
            Swal.fire({
                title: "Failed!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
                color: "red",
            });
        } else {
            // Handle other errors
            const errorMessage = error?.message;
            Swal.fire({
                title: "Failed!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
                color: "red",
            });
        }
    }
};

export const logout = (navigate) => (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/login");
};

export const protect =
    (navigate, navigatePathSuccess, navigatePathError) =>
    async (dispatch, getState) => {
        try {
            const { token } = getState().auth;

            if (!token) return navigate("/login");

            axios.get(`${import.meta.env.VITE_VERCEL_AUTH}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (navigatePathSuccess) navigate(navigatePathSuccess);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response.status === 401) {
                    dispatch(logout());
                    if (navigatePathError) navigate(navigatePathError);
                    return;
                }
            }
        }
    };