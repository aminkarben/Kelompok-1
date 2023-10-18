import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import "../Components/CardComponent/popularcard.css";

const SearchMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  const queryValue = searchParams.get("query");
  const pageValue = searchParams.get("page");
  const adultValue = searchParams.get("adult");

  useEffect(() => {
    const searchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (queryValue) {
          const response = await axios.get(
            `${
              import.meta.env.VITE_VERCEL_SEARCH_URL
            }?query=${queryValue}&include_adult=${adultValue}&page=${pageValue}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = response.data;
          setSearchedMovies(data.data);
          setErrors({ ...errors, isError: false });
        }
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
    searchData();
  }, []);

  const currentPage = parseInt(pageValue, 10) || 1; // ubah ke angka bilangan bulat dan defaultnya 1 jika kosong
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  if (errors.isError) {
    return <h1 className="text-white text-center mt-5">{errors.message}</h1>;
  }

  if (searchedMovies.length === 0) {
    return <h1 className="mt-5 ms-5 text-white">Loading....</h1>;
  }

  return (
    <>
      <h1 className="mt-5 mx-5 text-light">
        Results for <q>{queryValue}</q>
      </h1>
      <div className="d-flex justify-content-center flex-wrap gap-3">
        {searchedMovies.map((movie) => (
          <div
            key={movie?.id}
            className="card text-light bg-dark responsive-image"
          >
            <Link
              to={`/details/${movie.id}`}
              className="text-decoration-none text-light"
            >
              <LazyLoadImage
                alt={movie.title}
                width={"100%"}
                height={"100%"}
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
                  <h5 className="card-title m-0 ">{movie.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        {prevPage > 0 && (
          <Link
            to={`/search?query=${queryValue}&page=${prevPage}`}
            className="btn btn-primary me-2"
          >
            Previous Page
          </Link>
        )}

        <Link
          to={`/search?query=${queryValue}&page=${nextPage}`}
          className="btn btn-primary"
        >
          Next Page
        </Link>
      </div>
    </>
  );
};

export default SearchMovies;
