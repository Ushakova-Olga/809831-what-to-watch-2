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
        runTime: null,
      };

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
    }

    componentDidMount() {
      const {information} = this.props;
      const {videoLink} = information;
      const video = this._videoRef.current;

      video.src = videoLink;

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
          runTime: video.duration,
          progress: video.currentTime,
        });
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
      video.onloadedmetadata = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
    }

    _handlePlayButtonClick() {
      const video = this._videoRef.current;
      if (this.state.isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      this.setState({isPlaying: !this.state.isPlaying});
    }

    _handleFullScreenButtonClick() {
      const video = this._videoRef.current;
      this.setState({isFullscreen: !this.state.isFullscreen});
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }

    render() {
      const {isLoading, isPlaying, isFullscreen, progress, runTime} = this.state;

      return (
        <Component
          {...this.props}
          videoRef={this._videoRef}
          isLoading={isLoading}
          isPlaying={isPlaying}
          isFullscreen={isFullscreen}
          progress={progress}
          runTime={runTime}
          onPlayButtonClick={this._handlePlayButtonClick}
          onFullScreenButtonClick={this._handleFullScreenButtonClick}
        />
      );
    }
  }

  WithVideoPlayerLarge.propTypes = {
    information: PropTypes.shape({
      name: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      released: PropTypes.number.isRequired,
      posterImage: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      scoresCount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      starring: PropTypes.array.isRequired,
      director: PropTypes.string.isRequired,
      runTime: PropTypes.number.isRequired,
      videoLink: PropTypes.string.isRequired,
    }).isRequired,
  };

  return WithVideoPlayerLarge;
};

export default withVideoPlayerLarge;
