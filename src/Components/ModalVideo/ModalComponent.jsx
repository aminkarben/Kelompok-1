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
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_VERCEL_API_URL}/${movieId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const { data } = response.data;

                if (data?.videos) {
                    const trailer = data?.videos.find(
                        (video) =>
                            video.type === "Trailer" && video.site === "YouTube"
                    );

                    if (trailer) {
                        const trailerKey = trailer.key;
                        setVideoData(trailerKey);
                    } else {
                        const firstVideo = data.videos.find(
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
    }, []);

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
