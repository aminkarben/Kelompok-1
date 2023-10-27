// import axios from "axios";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./popularcard.css";
import { useDispatch, useSelector } from "react-redux";
import getPopularData from "../../redux/actions/popularMovieActions";

const PopularCard = ({ showAllMovies }) => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.popular.popularMovies);

  useEffect(() => {
    dispatch(getPopularData());
  }, [dispatch]);

  if (popularMovies.length === 0) {
    return <h1 className="text-white mt-5 ms-5">Loading....</h1>;
  }

  return (
    <div>
      <div className="d-flex justify-content-center flex-wrap gap-3">
        {popularMovies
          .slice(0, showAllMovies ? popularMovies.length : 6)
          .map((movie) => (
            <div
              key={movie?.id}
              className="card text-light bg-black responsive-image custom-anim"
            >
              <Link
                to={`/details/${movie?.id}?language=en-US`}
                className="text-decoration-none text-light"
              >
                <LazyLoadImage
                  alt={movie?.original_title}
                  height={"100%"}
                  width={"100%"}
                  src={`${import.meta.env.VITE_VERCEL_IMG_URL_ORIGINAL}${
                    movie.poster_path
                  }`}
                  className="rounded"
                  style={{
                    objectFit: "cover",
                    background: "#EEEEEE",
                  }}
                  onError={(e) => {
                    e.target.src = "/Placeholder.svg";
                  }}
                />
                <div
                  key={movie?.id}
                  className="card-img-overlay d-flex flex-column justify-content-between"
                >
                  <div className="card-text m-0">
                    <span>
                      <small className="badge bg-danger me-2">
                        ⭐ {parseFloat(movie?.vote_average).toFixed(1)} / 10
                      </small>
                    </span>
                  </div>
                  <div className="custom-text rounded text-center description">
                    <h5 className="card-title m-0 fs-5">{movie?.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularCard;

PopularCard.propTypes = {
  showAllMovies: PropTypes.bool,
};
