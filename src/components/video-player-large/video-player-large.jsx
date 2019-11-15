import React from "react";
import PropTypes from 'prop-types';

class VideoPlayerLarge extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      information,
      videoRef,
      isPlaying,
      progress,
      duration,
      onPlayButtonClick,
      onFullScreenButtonClick,
    } = this.props;

    const {src, img} = information;

    const format = src.match(/\w+$/);

    return (
      <div className="player">
        <video src={src} className="player__video" poster={`img/${img}`} type={`video/${format}`} ref={videoRef} >
        </video>

        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={duration ? Math.round((progress / duration) * 100) : 0} max="100"></progress>
              <div className="player__toggler" style={{left: `${duration ? Math.round((progress / duration) * 100) : 0}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{duration ? this._timeToString(progress) : `00:00:00`}</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ? (
              <button
                type="button"
                className="player__play"
                onClick={onPlayButtonClick}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>
            ) : (
              <button type="button" className="player__play" onClick={onPlayButtonClick}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
            )}

            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={ () => {
              onFullScreenButtonClick();
              videoRef.current.requestFullscreen();
            }
            }>
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

  _timeToString(seconds) {
    seconds = Math.round(seconds);
    let hours = 0;
    let minutes = 0;

    hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    const time = `${String(hours).padStart(2, `0`)}:${String(minutes).padStart(2, `0`)}:${String(seconds).padStart(2, `0`)}`;
    return time;
  }
}

VideoPlayerLarge.propTypes = {
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

  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  progress: PropTypes.number,

  onPlayButtonClick: PropTypes.func,
  onFullScreenButtonClick: PropTypes.func,

  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)}),
  ]),
};

export default VideoPlayerLarge;
