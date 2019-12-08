import React from "react";
import PropTypes from "prop-types";
import VideoPlayerSmall from "../../components/video-player-small/video-player-small.jsx";
import withVideoPlayerSmall from "../../hocs/with-video-player-small/with-video-player-small.jsx";
import {Link} from "react-router-dom";

const VideoPlayerSmallWrapped = withVideoPlayerSmall(VideoPlayerSmall);

const SmallCard = (props) => {
  const {information, onMouseEnter, onMouseLeave, isActive, id} = props;
  const {name, previewImage, previewVideoLink} = information;

  return <article className="small-movie-card catalog__movies-card"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Link to={`/films/${id}`}>
      <div className="small-movie-card__image">
        <VideoPlayerSmallWrapped
          previewVideoLink={previewVideoLink}
          previewImage={previewImage}
          isPlaying={isActive}
          key={`v${id}`}>
        </VideoPlayerSmallWrapped>
      </div>
    </Link>
    <h3 className="small-movie-card__title">
      <Link to={`/films/${id}`} className="small-movie-card__link" >{name}</Link>
    </h3>
  </article>;
};


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
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default SmallCard;
