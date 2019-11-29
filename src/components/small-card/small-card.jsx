import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../../components/video-player/video-player.jsx";

class SmallCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timerId = null;
  }

  render() {
    const {information, clickHandler, onMouseEnter, onMouseLeave, isActive, id} = this.props;
    const {name, previewImage, previewVideoLink} = information;

    return <article className="small-movie-card catalog__movies-card"
      onClick={() => {
        window.location.href = `/films/${id}`;
        clickHandler();
      }}
      onMouseEnter={() => {
        this.timerId = setTimeout(onMouseEnter, 1000);
      }}
      onMouseLeave={() => {
        clearTimeout(this.timerId);
        onMouseLeave();
      }}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          previewVideoLink={previewVideoLink}
          previewImage={previewImage}
          isPlaying={isActive}
          clickHandler={clickHandler}
          key={`v${id}`}>
        </VideoPlayer>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" >{name}</a>
      </h3>
    </article>;
  }
}

SmallCard.propTypes = {
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
  clickHandler: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default SmallCard;
