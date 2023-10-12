import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./popularcard.css";

const PopularCard = ({ showAllMovies }) => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_VERCEL_API_URL}/popular`,
                    {
                        headers: {
                            Authorization: `Bearer ${
                                import.meta.env.VITE_VERCEL_ACCESS_TOKEN_AUTH
                            }`,
                        },
                    }
                );
                const { data } = response;
                setPopularMovies(data?.results);
            } catch (error) {
                console.error(error);
            }
        };
        getPopularMovies();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-center flex-wrap gap-3">
                {popularMovies
                    .slice(0, showAllMovies ? popularMovies.length : 6)
                    .map((movie) => (
                        <div
                            key={movie?.id}
                            className="card text-light bg-black responsive-image"
                        >
                            <Link
                                to={`/details/${movie?.id}?language=en-US`}
                                className="text-decoration-none text-light"
                            >
                                <LazyLoadImage
                                    alt={movie?.original_title}
                                    height={"100%"}
                                    width={"100%"}
                                    src={`${
                                        import.meta.env
                                            .VITE_VERCEL_IMG_URL_ORIGINAL
                                    }${movie.poster_path}`}
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
                                                ⭐{" "}
                                                {parseFloat(
                                                    movie?.vote_average
                                                ).toFixed(1)}{" "}
                                                / 10
                                            </small>
                                        </span>
                                    </div>
                                    <div className="custom-text rounded text-center description">
                                        <h5 className="card-title m-0 fs-5">
                                            {movie?.title}
                                        </h5>
                                        <p className="card-text">
                                            <small>
                                                Release Date :{" "}
                                                {movie?.release_date}
                                            </small>
                                        </p>
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
