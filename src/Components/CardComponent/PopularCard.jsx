import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./popularcard.css";

const PopularCard = ({ showAllMovies }) => {
  const [popularMovies, setPopularMovies] = useState([]);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_VERCEL_API_URL}/popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;
        setPopularMovies(data);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.message || error?.message,
          });
          return;
        }

        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };
    getPopularMovies();
  }, []);

  if (errors.isError) {
    return (
      <h1 className="text-danger text-center fw-bold ">{errors.message}</h1>
    );
  }

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
