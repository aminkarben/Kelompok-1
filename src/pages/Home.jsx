import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CarouselComponent from "../Components/CarouselComp/CarouselComponent";
import FavouriteMovies from "../Components/PopularMovies";
import { getUser } from "../redux/actions/profileAction";
const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <>
            <CarouselComponent />
            <FavouriteMovies />
        </>
    );
};

export default Home;
