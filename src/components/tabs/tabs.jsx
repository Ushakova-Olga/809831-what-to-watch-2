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
    const {information} = this.props;
    const {currentTab} = this.state;

    return (
      <section className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">

            <li class = {`movie-nav__item ${this.state.currentTab === 0 ? movie-nav__item--active:``}`}>
              <a href="#" class="movie-nav__link">Overview</a>
            </li>
            <li class = {`movie-nav__item ${this.state.currentTab === 1 ? movie-nav__item--active:``}`}>
              <a href="#" class="movie-nav__link">Details</a>
            </li>
            <li class = {`movie-nav__item ${this.state.currentTab === 2 ? movie-nav__item--active:``}`}>
              <a href="#" class="movie-nav__link">Reviews</a>
            </li>
          </ul>
        </nav>

        {renderOverview(currentTab, indexTab: index, information)}
        {renderDetails(currentTab, indexTab: index, information)}
        {renderReviews(currentTab, indexTab: index, information)}
      </section>
    );
  }

  renderOverview({currentTab, indexTab, information}) {
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

  renderDetails({currentTab, indexTab, information}) {
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

  renderReviews({currentTab, indexTab}) {
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
    src: PropTypes.string.isRequired,
    rating,
    ratingCount,
    description,
    actors,
    genre,
    year,
  }).isRequired,
/*  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  film: PropTypes.instanceOf(Film).isRequired,*/
};


/*SmallCard.propTypes = {
  information: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  clickHandler: PropTypes.func,
  onCardMouseEnter: PropTypes.func,
  onCardMouseLeave: PropTypes.func,
  id: PropTypes.number.isRequired,
};*/

export default Tabs;
