import React from "react";
import PropTypes from "prop-types";

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = React.createRef();
    //this._playPromize;
  }

  render() {
    const {previewVideoLink, previewImage} = this.props;
    const format = previewVideoLink.match(/\w+$/);

    return (
      <video
        muted
        poster={previewImage}
        width="100%"
        height="100%"
        ref={this._videoRef}>
        <source
          src={previewVideoLink}
          type={`video/${format}`}
        ></source>
      </video>
    );
  }

  componentDidMount() {
    const {previewVideoLink} = this.props;
    const video = this._videoRef.current;

    if (video) {
      video.src = previewVideoLink;
      video.load();
    }
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
        if (video.readyState >= 2) {
          //this._playPromize =
          video.play();
        }
      } else {//if (this._playPromize !== undefined) {
        video.pause();
        video.load();
      }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.src = ``;
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
};

export default VideoPlayer;
