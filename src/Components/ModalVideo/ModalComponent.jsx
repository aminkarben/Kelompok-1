import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const ModalComponent = ({ movieId, onClose, show }) => {
    const [videoData, setVideoData] = useState();

    const handleClose = () => {
        onClose();
    };

    const youtubeLink = "https://www.youtube.com/embed/";

    useEffect(() => {
        const getVideoData = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
                    {
                        headers: {
                            Authorization: `Bearer ${
                                import.meta.env.VITE_VERCEL_ACCESS_TOKEN_AUTH
                            }`,
                        },
                    }
                );
                const { data } = response;

                if (data?.results) {
                    const trailer = data?.results.find(
                        (video) =>
                            video.type === "Trailer" && video.site === "YouTube"
                    );

                    if (trailer) {
                        const trailerKey = trailer.key;
                        setVideoData(trailerKey);
                    } else {
                        const firstVideo = data.results.find(
                            (video) => video.site === "YouTube"
                        );
                        if (firstVideo) {
                            const videoKey = firstVideo.key;
                            setVideoData(videoKey);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        getVideoData();
    }, [movieId]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <iframe
                        width="100%"
                        height="300px"
                        src={`${youtubeLink}${videoData}?autoplay=1`}
                        title="YouTube embed video"
                        allow="autoplay"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalComponent;

ModalComponent.propTypes = {
    movieId: PropTypes.number,
    onClose: PropTypes.func,
    show: PropTypes.bool,
};
