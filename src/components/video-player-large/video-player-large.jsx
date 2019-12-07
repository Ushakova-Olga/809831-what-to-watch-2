import React from "react";
import PropTypes from "prop-types";
import {timeToString} from "../../util/util";
const MIN_PROCENT = 0;
const MAX_PROCENT = 100;

class VideoPlayerLarge extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      videoRef,
      isPlaying,
      progress,
      runTime,
      onPlayButtonClick,
      onFullScreenButtonClick,
      onOpenCloseFilm,
      information
    } = this.props;

    const {videoLink, previewImage, name} = information;
    const format = videoLink.match(/\w+$/);

    return (
      <div className="player">
        <video src={videoLink} className="player__video" poster={previewImage} type={`video/${format}`} ref={videoRef} >
        </video>

        <button type="button" className="player__exit" onClick={() => {
          onOpenCloseFilm(false);
        }}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={runTime ? Math.round((progress / runTime) * MAX_PROCENT) : MIN_PROCENT} max={MAX_PROCENT}></progress>
              <div className="player__toggler" style={{left: `${runTime ? Math.round((progress / runTime) * MAX_PROCENT) : MIN_PROCENT}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{(runTime - progress > 0) ? timeToString(runTime - progress) : `00:00:00`}</div>
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

            <div className="player__name">{name}</div>

            <button type="button" className="player__full-screen" onClick={onFullScreenButtonClick}>
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
}

VideoPlayerLarge.propTypes = {
  information: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    scoresCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
    director: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    videoLink: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired,

  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  runTime: PropTypes.number,
  progress: PropTypes.number,

  onPlayButtonClick: PropTypes.func,
  onFullScreenButtonClick: PropTypes.func,

  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)}),
  ]),
  onOpenCloseFilm: PropTypes.func,
};

export default VideoPlayerLarge;
