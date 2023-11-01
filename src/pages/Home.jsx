import { useEffect } from "react";
import CarouselComponent from "../Components/CarouselComp/CarouselComponent";
import FavouriteMovies from "../Components/PopularMovies";
import { getUser } from "../redux/actions/profileAction";
import { useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  });

  return (
    <>
      <CarouselComponent />
      <FavouriteMovies />
    </>
  );
};

export default Home;
