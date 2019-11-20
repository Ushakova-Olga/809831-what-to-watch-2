import React from "react";
import PropTypes from "prop-types";

class TabDetails extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentTab, indexTab, information} = this.props;

    if (currentTab === indexTab) {
      return <article className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{information.director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value" style={{whiteSpace: `pre`}}>
              {information.starring.join(`,\n`)}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">
              {information.runTime}
            </span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{information.genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{information.released}</span>
          </p>
        </div>
      </article>;
    }
    return null;
  }
}

TabDetails.propTypes = {
  currentTab: PropTypes.number.isRequired,
  indexTab: PropTypes.number.isRequired,
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
};

export default TabDetails;
