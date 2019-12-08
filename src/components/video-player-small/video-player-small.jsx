import React from "react";
import PropTypes from "prop-types";

const VideoPlayerSmall = (props) => {
  const {previewVideoLink, previewImage, videoRef} = props;
  const format = previewVideoLink.match(/\w+$/);

  return (
    <video
      muted
      poster={previewImage}
      width="100%"
      height="100%"
      ref={videoRef}>
      <source
        src={previewVideoLink}
        type={`video/${format}`}
      ></source>
    </video>
  );
};

VideoPlayerSmall.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)}),
  ]),
};

export default VideoPlayerSmall;
