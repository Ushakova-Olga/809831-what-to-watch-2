import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

const withVideoPlayerLarge = (Component) => {
  class WithVideoPlayerLarge extends React.PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlaying: true,
        progress: 0,
      };

      // this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    }

    componentDidMount() {
      const {information} = this.props;
      const {src, img, name, genre, year, posterlarge, cover} = information;
      const video = this._videoRef.current;

      video.src = src;

      video.oncanplaythrough = () => this.setState({
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
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.onplay = null;
      video.onpause = null;
      video.src = ``;
    }

    /*_onPlayButtonClick() {
      this.props.onPlayButtonClick();
      this.setState({isPlaying: !this.state.isPlaying});
    }*/

    render() {
      const {information, onPlayButtonClick} = this.props;
      const {src, img, name, genre, year, posterlarge, cover} = information;

      return (
        <Component
          {...this.props}
          videoRef={this._videoRef}
        />
      );
    }
  }



  WithVideoPlayerLarge.propTypes = {
//    img: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
//    src: PropTypes.string.isRequired,
  };

  return WithVideoPlayerLarge;
};

export default withVideoPlayerLarge;
