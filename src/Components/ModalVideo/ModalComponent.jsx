import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../../redux/actions/detailActions";
import { setVideoData } from "../../redux/reducers/detailReducers";

const ModalComponent = ({ movieId, onClose, show }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const dispatch = useDispatch();
  const videoKey = useSelector((state) => state.detail.videoData);

  const youtubeLink = "https://www.youtube.com/embed/";

  useEffect(() => {
    dispatch(getVideo(movieId));
  }, [dispatch, movieId]);

  useEffect(() => {
    if (videoKey) {
      setVideoLoaded(true);
    }
  }, [videoKey]);

  const handleClose = () => {
    dispatch(setVideoData(null));
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {videoKey ? (
            videoLoaded && (
              <iframe
                width="100%"
                height="300px"
                src={`${youtubeLink}${videoKey}?autoplay=1`}
                title="YouTube embed video"
                allow="autoplay"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )
          ) : (
            <p>trailer tidak ditemukan</p>
          )}
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
