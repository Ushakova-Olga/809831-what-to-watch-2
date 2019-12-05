import React from "react";
import PropTypes from "prop-types";

const RATING_BAD = 3;
const RATING_NORMAL = 5;
const RATING_GOOD = 8;
const RATING_VERY_GOOD = 10;

class TabOverview extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  levelCount(rating) {
    if (rating < RATING_BAD) {
      return `bad`;
    } else if (rating < RATING_NORMAL) {
      return `normal`;
    } else if (rating < RATING_GOOD) {
      return `good`;
    } else if (rating < RATING_VERY_GOOD) {
      return `very good`;
    }
    return `awesome`;
  }
  render() {
    const {currentTab, indexTab, information} = this.props;

    if (currentTab === indexTab) {
      return <article>
        <div className="movie-rating">
          <div className="movie-rating__score">{information.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{this.levelCount(information.rating)}</span>
            <span className="movie-rating__count">{`${information.scoresCount} ratings`}</span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{information.description}</p>

          <p className="movie-card__director">
            <strong>Director: {information.director}</strong>
          </p>

          <p className="movie-card__starring">
            <strong>Starring: {information.starring.join(`, `)}</strong>
          </p>
        </div>
      </article>;
    }

    return null;
  }
}

TabOverview.propTypes = {
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
    scoresCount: PropTypes.number.iRequired,
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

export default TabOverview;
