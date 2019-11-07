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
    const {information} = this.props;

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
        <TabReviews currentTab={currentTab} indexTab={2} />
      </section>
    );
  }
}

Tabs.propTypes = {
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

export default Tabs;
