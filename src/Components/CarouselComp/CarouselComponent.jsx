import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import "./carousel.css";
import ModalComponent from "../ModalVideo/ModalComponent";

const CarouselComponent = () => {
  const [movies, setMovies] = useState([]);
  const [selectId, setSelectId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getPlayingMovies = async () => {
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
        setMovies(data);
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
    getPlayingMovies();
  }, []);

  if (errors.isError) {
    return <h1 className="text-white text-center mt-5">{errors.message}</h1>;
  }

  if (movies.length === 0) {
    return <h1 className="text-white mt-5 ms-5">Loading....</h1>;
  }

  const truncateText = (text, maxLenght) => {
    return text.length > maxLenght
      ? text.substring(0, maxLenght) + "..."
      : text;
  };

  const handleShowModal = (movieId) => {
    setSelectId(movieId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectId(null);
    setShowModal(false);
  };

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner text-center">
        {movies.map((movie, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""} `}
            data-bs-interval="5000"
            key={movie.id}
          >
            <LazyLoadImage
              src={`${import.meta.env.VITE_VERCEL_IMG_URL_ORIGINAL}${
                movie.backdrop_path
              }`}
              className="d-block w-100 custom-background"
              alt={movie.original_title}
            />

            <div className="carousel-caption h-100 d-flex flex-column justify-content-center align-items-start">
              <h1 className="h1-responsive">{movie.title}</h1>
              <p className="p-responsive text-start w-100 w-md-50">
                {truncateText(movie?.overview, 150)}
              </p>
              <div>
                <button
                  onClick={() => handleShowModal(movie.id)}
                  className="custom-btn btn btn-danger"
                >
                  <span>
                    <img
                      alt="play_icon"
                      src="/play.svg"
                      style={{
                        width: "20px",
                        marginRight: "10px",
                      }}
                    />
                  </span>
                  WATCH TRAILER
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Komponen Modal */}
      {selectId && (
        <ModalComponent
          movieId={selectId}
          onClose={handleCloseModal}
          show={showModal}
        />
      )}
    </div>
  );
};

export default CarouselComponent;
