import React from "react";
import PropTypes from "prop-types";
import TabDetails from "../../components/tab-details/tab-details.jsx";
import TabOverview from "../../components/tab-overview/tab-overview.jsx";
import TabReviews from "../../components/tab-reviews/tab-reviews.jsx";

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }

  render() {
    const {currentTab} = this.state;
    const {information, comments} = this.props;

    return (
      <section className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">

            <li className = {`movie-nav__item ${this.state.currentTab === 0 ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={(evt) => {
                evt.preventDefault();
                if (this.state.activeTab !== 0) {
                  this.setState({currentTab: 0});
                }
              }}>Overview</a>
            </li>
            <li className = {`movie-nav__item ${this.state.currentTab === 1 ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={(evt) => {
                evt.preventDefault();
                if (this.state.activeTab !== 1) {
                  this.setState({currentTab: 1});
                }
              }}>Details</a>
            </li>
            <li className = {`movie-nav__item ${this.state.currentTab === 2 ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={(evt) => {
                evt.preventDefault();
                if (this.state.activeTab !== 2) {
                  this.setState({currentTab: 2});
                }
              }}>Reviews</a>
            </li>
          </ul>
        </nav>

        <TabOverview currentTab={currentTab} indexTab={0} information={information} />
        <TabDetails currentTab={currentTab} indexTab={1} information={information} />
        <TabReviews currentTab={currentTab} comments={comments} indexTab={2} />
      </section>
    );
  }
}

Tabs.propTypes = {
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

export default Tabs;
