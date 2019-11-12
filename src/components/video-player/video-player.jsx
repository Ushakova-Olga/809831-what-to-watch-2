import React from "react";
import PropTypes from 'prop-types';

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = React.createRef();
  }

  render() {
    const {src, img, isPlaying} = this.props;
    const format = src.match(/\w+$/);

    return (
      <video
        muted
        poster={img}
        width="100%"
        height="100%"
        ref={this._videoRef}>
        <source
          src={src}
          type={`video/${format}`}
        ></source>
      </video>
    );
  }

  componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;

    if (video) {
      video.src = src;
    }
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    if (video) {
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.pause();
        video.load();
      }
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.src = ``;
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default VideoPlayer;
