import { useEffect } from "react";
import axios from "axios";
import CarouselComponent from "../Components/CarouselComp/CarouselComponent";
import FavouriteMovies from "../Components/PopularMovies";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const getMe = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                }

                await axios.get(`${import.meta.env.VITE_VERCEL_AUTH}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response.status === 401) {
                        localStorage.removeItem("token");
                        return navigate("/login");
                    }
                }
            }
        };
        getMe();
    }, []);

    return (
        <>
            <CarouselComponent />
            <FavouriteMovies />
        </>
    );
};

export default Home;
