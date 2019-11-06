import React from "react";
import PropTypes from "prop-types";

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }

  render() {
    const {currentTab} = this.state;

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

        {this.renderOverview(currentTab, 0)}
        {this.renderDetails(currentTab, 1)}
        {this.renderReviews(currentTab, 2)}
      </section>
    );
  }

  renderOverview(currentTab, indexTab) {
    const {information} = this.props;
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

  renderDetails(currentTab, indexTab) {
    const {information} = this.props;
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
              {information.actors.join(`,\n`)}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">
              {information.duration}
            </span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{information.genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{information.year}</span>
          </p>
        </div>
      </article>;
    }

    return null;
  }

  renderReviews(currentTab, indexTab) {
    if (currentTab === indexTab) {
      return <article className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">
                Discerning travellers and Wes Anderson fans will luxuriate in the
                glorious Mittel-European kitsch of one of the director&apos;s
                funniest and most exquisitely designed movies in years.
              </p>

              <footer className="review__details">
                <cite className="review__author">Kate Muir</cite>
                <time className="review__date" dateTime="2016-12-24">
                  December 24, 2016
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">8,9</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">
                Anderson&apos;s films are too precious for some, but for those of us
                willing to lose ourselves in them, they&apos;re a delight. &quot;The
                Grand Budapest Hotel&quot; is no different, except that he has added
                a hint of gravitas to the mix, improving the recipe.
              </p>

              <footer className="review__details">
                <cite className="review__author">Bill Goodykoontz</cite>
                <time className="review__date" dateTime="2015-11-18">
                  November 18, 2015
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">8,0</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">
                I didn&apos;t find it amusing, and while I can appreciate the
                creativity, it&apos;s an hour and 40 minutes I wish I could take
                back.
              </p>

              <footer className="review__details">
                <cite className="review__author">Amanda Greever</cite>
                <time className="review__date" dateTime="2015-11-18">
                  November 18, 2015
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">8,0</div>
          </div>
        </div>
        <div className="movie-card__reviews-col">
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">
                The mannered, madcap proceedings are often delightful, occasionally
                silly, and here and there, gruesome and/or heartbreaking.
              </p>

              <footer className="review__details">
                <cite className="review__author">Matthew Lickona</cite>
                <time className="review__date" dateTime="2016-12-20">
                  December 20, 2016
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">7,2</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">
                It is certainly a magical and childlike way of storytelling, even if
                the content is a little more adult.
              </p>

              <footer className="review__details">
                <cite className="review__author">Paula Fleri-Soler</cite>
                <time className="review__date" dateTime="2016-12-20">
                  December 20, 2016
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">7,6</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">
                It is certainly a magical and childlike way of storytelling, even if
                the content is a little more adult.
              </p>

              <footer className="review__details">
                <cite className="review__author">Paula Fleri-Soler</cite>
                <time className="review__date" dateTime="2016-12-20">
                  December 20, 2016
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">7,0</div>
          </div>
        </div>
      </article>;
    }

    return null;
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
