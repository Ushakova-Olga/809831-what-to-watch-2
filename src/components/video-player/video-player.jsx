import React from "react";
import PropTypes from 'prop-types';

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = React.createRef();

    this.state = {
      isPlaying: props.isPlaying,
    };
  }

  render() {
    // const {isPlaying} = this.state;
    const {src, img} = this.props;
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

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => this.setState({
        isPlaying: false,
      });
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
    video.onplay = null;
    video.onpause = null;
    video.src = ``;
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default VideoPlayer;
