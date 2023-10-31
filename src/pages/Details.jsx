import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions/detailActions";
import ModalComponent from "../Components/ModalVideo/ModalComponent";
import "./details.css";
import { getUser } from "../redux/actions/profileAction";

const Details = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const detailsMovie = useSelector((state) => state.detail.detailMovie);

    const [selectId, setSelectId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const languageValue = searchParams.get("language");

    useEffect(() => {
        let isMounted = true;
        dispatch(getDetail(id, languageValue))
            .then(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });
        dispatch(getUser());
        // Cleanup effect
        return () => {
            isMounted = false;
        };
    }, [dispatch, id, languageValue]);

    const handleShowModal = (movieId) => {
        setSelectId(movieId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectId(null);
        setShowModal(false);
    };

    const backdropPath = detailsMovie?.backdrop_path
        ? `${import.meta.env.VITE_VERCEL_IMG_URL_ORIGINAL}${
              detailsMovie.backdrop_path
          }`
        : "";

    return (
        <>
            {isLoading ? (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <Spinner
                        animation="border"
                        role="status"
                        variant="light"
                        className="mt-5"
                    ></Spinner>
                    <h1 className="text-white">Loading...</h1>
                </div>
            ) : (
                <div
                    className="bg-image"
                    style={{
                        backgroundImage: `url(${backdropPath})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "100vh",
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <div className="container-fluid d-flex align-items-center justify-content-center py-5 mt-5 custom-blur">
                        <div className="row">
                            <div className="col-md-4 text-center mb-3">
                                <LazyLoadImage
                                    alt={detailsMovie?.original_title}
                                    height={"100%"}
                                    width={350}
                                    src={
                                        detailsMovie?.poster_path
                                            ? `${
                                                  import.meta.env
                                                      .VITE_VERCEL_IMG_URL_ORIGINAL
                                              }${detailsMovie.poster_path}`
                                            : "/Placeholder.svg"
                                    }
                                    className="rounded"
                                    style={{
                                        objectFit: "cover",
                                        background: "#EEEEEE",
                                    }}
                                    onError={(e) => {
                                        e.target.src = "/Placeholder.svg";
                                    }}
                                />
                            </div>
                            <div className="col-md-8 text-white ">
                                <div className="mb-3">
                                    <div>
                                        <h1 className="fw-bold fs-1">
                                            {detailsMovie?.title}
                                        </h1>
                                        <p className="fs-6 m-0">
                                            Original title :{" "}
                                            {detailsMovie?.original_title}
                                        </p>
                                        <p className="fs-6">
                                            Status :{" "}
                                            <span className="fw-bold badge bg-danger">
                                                {detailsMovie?.status}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        {detailsMovie?.genres &&
                                        detailsMovie.genres.length > 0 ? (
                                            detailsMovie?.genres?.map(
                                                (genre) => (
                                                    <span
                                                        key={genre.id}
                                                        className="badge bg-primary me-2 "
                                                    >
                                                        {genre.name}
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <span className="badge bg-danger me-2">
                                                Data Not Found
                                            </span>
                                        )}
                                    </div>
                                    <p className="card-text m-0 fw-bold">
                                        ⭐{" "}
                                        {parseFloat(
                                            detailsMovie?.vote_average
                                        ).toFixed(1)}{" "}
                                        / 10
                                    </p>
                                    <p>{detailsMovie?.overview}</p>
                                    {detailsMovie?.tagline && (
                                        <p>
                                            Tagline :{" "}
                                            <q className="fw-semibold fst-italic">
                                                {detailsMovie?.tagline}
                                            </q>
                                        </p>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <p className="m-0 p-0 fw-semibold">
                                        Production Country :
                                    </p>
                                    {detailsMovie?.production_countries &&
                                    detailsMovie.production_countries.length >
                                        0 ? (
                                        detailsMovie?.production_countries?.map(
                                            (country) => (
                                                <span
                                                    key={country.iso_3166_1}
                                                    className="badge bg-primary me-2"
                                                >
                                                    {country.name}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <span className="badge bg-danger me-2">
                                            Data Not Found
                                        </span>
                                    )}
                                </div>
                                {/* <div className="mb-3">
                                <p className="m-0 p-0 fw-semibold">
                                    Production Company :
                                </p>
                                {detailsMovie?.production_companies &&
                                detailsMovie.production_companies.length > 0 ? (
                                    detailsMovie?.production_companies?.map(
                                        (company) => (
                                            <span
                                                key={company.id}
                                                className="badge bg-primary me-2 m-1"
                                            >
                                                {company.logo_path && (
                                                    <LazyLoadImage
                                                        className="m-1"
                                                        alt={`${company.name}`}
                                                        height={"25px"}
                                                        width={"30px"}
                                                        src={`${
                                                            import.meta.env
                                                                .VITE_VERCEL_IMG_URL_ORIGINAL
                                                        }${company.logo_path}`}
                                                    />
                                                )}
                                                {company.name}
                                            </span>
                                        )
                                    )
                                ) : (
                                    <span className="badge bg-danger me-2">
                                        Data Not Found
                                    </span>
                                )}
                            </div> */}
                                <Button
                                    variant="primary"
                                    className="mt-3"
                                    onClick={() =>
                                        handleShowModal(detailsMovie?.id)
                                    }
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
                                    Watch Trailer
                                </Button>
                            </div>
                        </div>
                    </div>

                    {selectId && (
                        <ModalComponent
                            movieId={selectId}
                            onClose={handleCloseModal}
                            show={showModal}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Details;
