import React from "react";
import PropTypes from "prop-types";

const withVideoPlayerSmall = (Component) => {
  class WithVideoPlayerSmall extends React.PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();
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
          video.play();
        }
      } else {
        video.pause();
        video.load();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
      video.src = ``;
    }

    render() {
      return (
        <Component
          {...this.props}
          videoRef={this._videoRef}
        />
      );
    }
  }

  WithVideoPlayerSmall.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  };

  return WithVideoPlayerSmall;
};

export default withVideoPlayerSmall;
