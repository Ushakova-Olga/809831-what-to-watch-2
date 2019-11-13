import React from "react";
import PropTypes from 'prop-types';

class VideoPlayerLarge extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {src, img} = this.props;
    const format = src.match(/\w+$/);

    return (
      <div class="player">
        <video src={src} className="player__video" poster={img} type={`video/${format}` ref={this._videoRef}>
        </video>

        <button type="button" class="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style="left: 30%;">Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;

    if (video) {
      video.src = src;
    }
  }*/

  /*componentDidUpdate() {
    const video = this._videoRef.current;
    if (video) {
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.pause();
        video.load();
      }
    }
  }*/

/*  componentWillUnmount() {
    const video = this._videoRef.current;
    video.src = ``;
  }*/
}

VideoPlayerLarge.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default VideoPlayerLarge;
