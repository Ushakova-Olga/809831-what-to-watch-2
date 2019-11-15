import React from "react";
import PropTypes from "prop-types";

const withVideoPlayerLarge = (Component) => {
  class WithVideoPlayerLarge extends React.PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlaying: false,
        isFullscreen: false,
        progress: null,
        duration: null,
      };

      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
      this._onFullScreenButtonClick = this._onFullScreenButtonClick.bind(this);
    }

    componentDidMount() {
      const {information} = this.props;
      const {src} = information;
      const video = this._videoRef.current;

      video.src = src;
      video.load();

      video.onloadeddata = () => this.setState({
        isLoading: false,
      });

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => this.setState({
        isPlaying: false,
      });

      video.ontimeupdate = () =>
        this.setState({progress: video.currentTime});

      video.onloadedmetadata = () =>
        this.setState({
          duration: video.duration,
          progress: video.currentTime,
        });
    }

    componentDidUpdate() {
      const video = this._videoRef.current;
      if (this.state.isLoading) {
        return;
      }
      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
      video.src = ``;

      video.onloadedmetadata = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
    }

    _onPlayButtonClick() {
      this.setState({isPlaying: !this.state.isPlaying});
    }

    _onFullScreenButtonClick() {
      this.setState({isFullscreen: !this.state.isFullscreen});
    }

    render() {
      const {isLoading, isPlaying, isFullscreen, progress, duration} = this.state;

      return (
        <Component
          {...this.props}
          videoRef={this._videoRef}
          isLoading={isLoading}
          isPlaying={isPlaying}
          isFullscreen={isFullscreen}
          progress={progress}
          duration={duration}
          onPlayButtonClick={this._onPlayButtonClick}
          onFullScreenButtonClick={this._onFullScreenButtonClick}
        />
      );
    }
  }

  WithVideoPlayerLarge.propTypes = {
    information: PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      posterlarge: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
      ratingCount: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      actors: PropTypes.array.isRequired,
      director: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired,
  };

  return WithVideoPlayerLarge;
};

export default withVideoPlayerLarge;
