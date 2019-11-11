import React from "react";
import PropTypes from "prop-types";

class TabOverview extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentTab, indexTab, information} = this.props;

    if (currentTab === indexTab) {
      return <article>
        <div className="movie-rating">
          <div className="movie-rating__score">{information.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">Very good</span>
            <span className="movie-rating__count">{`${information.ratingCount} ratings`}</span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{information.description}</p>

          <p className="movie-card__director">
            <strong>Director: {information.director}</strong>
          </p>

          <p className="movie-card__starring">
            <strong>Starring: {information.actors.join(`, `)}</strong>
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

export default TabOverview;
